from http.client import HTTPException
from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from pydantic import BaseModel
from config.database import get_db
from models.models import Comment as CommentModel
from dotenv import load_dotenv
import os

load_dotenv()

ADMIN_COMMENT_PASSWORD = os.getenv("ADMIN_COMMENT_PASSWORD")

router = APIRouter(tags=["COMMENT"])

templates = Jinja2Templates(directory="templates")

class CommentCreate(BaseModel):
    name: str
    text: str

class CommentDelete(BaseModel):
    text: str
    password: str


# HTML 페이지 렌더링
@router.get("/comment", response_class=HTMLResponse)
async def get_comment_page(request: Request, db: Session = Depends(get_db)):
    comments = db.query(CommentModel).all()

    return templates.TemplateResponse(
        "comment/comment.html", {"request": request, "comments": comments}
    )


@router.post("/api/save-comment", response_model=CommentCreate)
async def save_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    db_comment = CommentModel(name=comment.name, text=comment.text)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


@router.get("/api/comments", response_model=list[CommentCreate])
async def read_comments(db: Session = Depends(get_db)):
    comments = db.query(CommentModel).all()
    return comments

@router.post("/api/delete-comment")
async def delete_comment(comment: CommentDelete, db: Session = Depends(get_db)):
    if comment.password != ADMIN_COMMENT_PASSWORD:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    db_comment = (
        db.query(CommentModel).filter(CommentModel.text == comment.text).first()
    )
    if db_comment:
        db.delete(db_comment)
        db.commit()
        return {"success": True}
    else:
        raise HTTPException(status_code=404, detail="Comment not found")
