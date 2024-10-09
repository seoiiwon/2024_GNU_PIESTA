from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from config.database import get_db
from models.models import Booth
from sqlalchemy.orm import Session

router = APIRouter(tags=["BOOTH"])
templates = Jinja2Templates(directory="./templates/booth")

@router.get("/booth/list", response_class=HTMLResponse)
async def get_booth_list(request: Request, db: Session = Depends(get_db), date: str = "10.16"):
    # 날짜에 따라 필터링
    if date == "10.16":
        booths = db.query(Booth).filter(Booth.is_operating_on_16th == True).all()
    elif date == "10.17":
        booths = db.query(Booth).filter(Booth.is_operating_on_17th == True).all()
    elif date == "10.18":
        booths = db.query(Booth).filter(Booth.is_operating_on_18th == True).all()
    else:
        booths = []  # 유효하지 않은 날짜에 대한 처리

    return templates.TemplateResponse("booth_list.html", {"request": request, "booths": booths})
