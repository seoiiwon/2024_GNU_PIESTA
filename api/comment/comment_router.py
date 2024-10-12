from http.client import HTTPException
from sqlite3 import IntegrityError
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from pydantic import BaseModel
from config.database import get_db
from models.models import Comment as CommentModel

router = APIRouter(tags=["COMMENT"])

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="templates")


# Pydantic 모델
class CommentCreate(BaseModel):
    name: str
    text: str


class CommentDelete(BaseModel):
    text: str


# HTML 페이지 렌더링
@router.get("/comment", response_class=HTMLResponse)
async def get_comment_page(request: Request, db: Session = Depends(get_db)):
    # 데이터베이스에서 댓글 가져오기
    comments = db.query(CommentModel).all()
    # 템플릿에 데이터 전달
    return templates.TemplateResponse(
        "comment/comment.html", {"request": request, "comments": comments}
    )


# @router.post("/api/save-comment", response_model=CommentCreate)
# async def save_comment(comment: CommentCreate, db: Session = Depends(get_db)):
#     db_comment = CommentModel(name=comment.name, text=comment.text)
#     db.add(db_comment)
#     db.commit()
#     db.refresh(db_comment)
#     return db_comment


# 댓글 목록 불러오기
# @router.get("/api/comments", response_model=list[CommentCreate])
# async def read_comments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     comments = db.query(CommentModel).offset(skip).limit(limit).all()
#     return comments


from fastapi import HTTPException


# 댓글 삭제 엔드포인트
# @router.post("/api/delete-comment")
# async def delete_comment(comment: CommentDelete, db: Session = Depends(get_db)):
#     db_comment = (
#         db.query(CommentModel).filter(CommentModel.text == comment.text).first()
#     )
#     if db_comment:
#         db.delete(db_comment)
#         db.commit()
#         return {"success": True}
#     else:
#         raise HTTPException(status_code=404, detail="Comment not found")
