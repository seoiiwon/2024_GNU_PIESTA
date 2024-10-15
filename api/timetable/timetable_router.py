from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates/timetable")

router = APIRouter(tags=["timetable"])

@router.get("/timetable", response_class=HTMLResponse)
async def read_timetable(request: Request):
    return templates.TemplateResponse("timetable.html", {"request": request})
