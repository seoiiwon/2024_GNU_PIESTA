from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from config.database import get_db
from models.models import Booth
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os



router = APIRouter(tags=["BOOTH"])
templates = Jinja2Templates(directory="./templates/booth")



@router.get("/booth/list", response_class=HTMLResponse)
async def get_booth_list(request: Request, db: Session = Depends(get_db)):
    # 데이터베이스에서 부스 리스트를 가져옴
    booths = db.query(Booth).all()

    # booth_list.html 템플릿을 부스 데이터와 함께 렌더링
    return templates.TemplateResponse("booth_list.html", {"request": request, "booths": booths})

