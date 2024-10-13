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

router = APIRouter(tags=["BOOTH"])
templates = Jinja2Templates(directory="./templates/booth")

# 요청 데이터 모델 정의


class HeartStateRequest(BaseModel):
    heartStates: List[str]  # heartStates는 문자열 리스트로 받음

# 부스 리스트를 가져오는 GET 요청


@router.get("/booth/list", response_class=HTMLResponse)
async def get_booth_list(request: Request, db: Session = Depends(get_db), date: str = "10.16", A: str = "[]"):
    # A를 JSON 문자열로 받아서 리스트로 변환
    A = json.loads(A)  # A는 JSON 문자열이므로 파싱해야 합니다.
    # 날짜에 따라 필터링
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
        booths = []  # 유효하지 않은 날짜에 대한 처리

    print("AAA:", A)
    return templates.TemplateResponse("booth_list.html", {"request": request, "booths": booths, "A": A})

# heartStates 값을 처리하는 POST 요청


@router.post("/api/save_heart_states")
async def save_heart_states(request: HeartStateRequest):
    # heartStates 값을 정수로 변환하여 A 리스트에 추가
    A = [int(booth_id) for booth_id in request.heartStates]  # 문자열을 정수로 변환

     
    return templates.TemplateResponse("booth_list.html", {"request": request, "A": A})
