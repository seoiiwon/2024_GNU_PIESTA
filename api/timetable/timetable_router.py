from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# 템플릿 디렉토리 설정
templates = Jinja2Templates(directory="templates")

# 라우터 설정
router = APIRouter(tags=["TIMETABLE"])

# /main 경로
@router.get("/timetable", response_class=HTMLResponse)
async def main(request: Request):
    # 로그인 여부와 상관없이 /main으로 바로 접속 가능
    return templates.TemplateResponse("timetable.html", {"request": request})

