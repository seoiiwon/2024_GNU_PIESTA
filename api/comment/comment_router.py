from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["COMMENT"])

templates = Jinja2Templates(directory="templates")

router = APIRouter(tags=["COMMENT"])


@router.get("/comment", response_class=HTMLResponse)
async def comment(request: Request):
    # 로그인 체크 없이 comment.html 렌더링
    return templates.TemplateResponse("comment.html", {"request": request})
