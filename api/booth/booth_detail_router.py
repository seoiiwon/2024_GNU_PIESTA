from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["BOOTH"])


templates = Jinja2Templates(directory="./templates/booth")


@router.get("/booth/detail", response_class=HTMLResponse)
async def getHome(request: Request):
    return templates.TemplateResponse(name="booth_detail.html", request=request)