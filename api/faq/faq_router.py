from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["FAQ"])

templates = Jinja2Templates(directory="./templates/faq")

@router.get("/faq", response_class=HTMLResponse)
async def testRouter(request: Request):
    return templates.TemplateResponse(name="faq.html", request=request)