from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["BOOTH"])

templates = Jinja2Templates(directory="./templates/booth")


@router.get("/booth/list", response_class=HTMLResponse)
async def getHome(request: Request):
    return templates.TemplateResponse(name="booth_list.html", request=request)
