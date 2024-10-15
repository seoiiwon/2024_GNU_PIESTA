from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from config.database import get_db
from models.models import Booth
from typing import List
import json
from fastapi.responses import RedirectResponse

router = APIRouter(tags=["BOOTH"])
templates = Jinja2Templates(directory="./templates/booth")

class HeartStateRequest(BaseModel):
    heartStates: List[str]


@router.post("/api/save_heart_states")
async def save_heart_states(request: HeartStateRequest):
    A = [int(booth_id) for booth_id in request.heartStates]
    A_str = json.dumps(A) 
    redirect_url = f"/booth/list?A={A_str}"  

    return RedirectResponse(redirect_url, status_code=303)


@router.get("/booth/list", response_class=HTMLResponse)
async def get_booth_list(request: Request, db: Session = Depends(get_db), date: str = "10.16", A: str = "[]"):
    A = json.loads(A) 
    if date == "10.16":
        booths = db.query(Booth).filter(
            Booth.is_operating_on_16th == True).all()
    elif date == "10.17":
        booths = db.query(Booth).filter(
            Booth.is_operating_on_17th == True).all()
    elif date == "10.18":
        booths = db.query(Booth).filter(
            Booth.is_operating_on_18th == True).all()
    else:
        booths = []

    return templates.TemplateResponse(name="booth_list.html", context={"request": request, "booths" : booths})
