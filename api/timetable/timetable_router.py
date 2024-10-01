from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="templates/timetable")

# APIRouter 인스턴스 생성
router = APIRouter(tags=["timetable"])

# /timetable 경로로 라우트 정의
@router.get("/timetable", response_class=HTMLResponse)
async def read_timetable(request: Request):
    return templates.TemplateResponse("timetable.html", {"request": request})
