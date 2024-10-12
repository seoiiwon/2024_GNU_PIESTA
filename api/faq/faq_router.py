from fastapi import APIRouter, Request, Depends, status, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from sqlalchemy.orm import Session
from config.database import get_db
from models.models import Faq
from dotenv import load_dotenv
import os

load_dotenv()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

router = APIRouter(tags=["공지"])

templates = Jinja2Templates(directory="./templates/faq")

class PostFAQSchema(BaseModel):
    question: str
    answer: str

@router.get("/faq", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def testRouter(request: Request, db: Session=Depends(get_db)):
    faq = db.query(Faq).order_by(Faq.id.asc()).all()
    return templates.TemplateResponse(
        name="faq.html", 
        context={
            "request" : request,
            "faqAll" : faq
            }
        )

@router.post("/postfaq", status_code=status.HTTP_201_CREATED)
async def postFAQ(postFAQSchema: PostFAQSchema, db: Session=Depends(get_db)):
    if (not postFAQSchema.question and not postFAQSchema.answer):
        raise HTTPException(status_code=400, detail="입력 필드를 채워주세요.")
    
    try:
        newFAQ = Faq(
            question = postFAQSchema.question,
            answer = postFAQSchema.answer
        )
        db.add(newFAQ)
        db.commit()
        db.refresh(newFAQ)
    except:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# /admin/notice 경로 보호
@router.get("/admin/faq", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def get_faq(request: Request, password=ADMIN_PASSWORD):
    return templates.TemplateResponse(name="postFAQ.html", context={"request" : request, "password" : password})