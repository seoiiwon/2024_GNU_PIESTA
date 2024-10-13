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

# 요청 데이터 모델 정의


class HeartStateRequest(BaseModel):
    heartStates: List[str]  # heartStates는 문자열 리스트로 받음

# 부스 리스트를 가져오는 GET 요청


@router.post("/api/save_heart_states")
async def save_heart_states(request: HeartStateRequest):
    A = [int(booth_id) for booth_id in request.heartStates]
    print('여긴되니', A)

    # A 리스트를 JSON 문자열로 변환 후 URL 파라미터로 전달
    A_str = json.dumps(A)  # 리스트를 문자열로 변환
    redirect_url = f"/booth/list?A={A_str}"  # GET 요청으로 리다이렉트할 URL 구성

    # 303 See Other로 GET 방식으로 리다이렉트
    return RedirectResponse(redirect_url, status_code=303)


@router.get("/booth/list", response_class=HTMLResponse)
async def get_booth_list(request: Request, db: Session = Depends(get_db), date: str = "10.16", A: str = "[]"):
    # A를 JSON 문자열로 받아서 리스트로 변환
    print('여긴어때', A)
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
    likelist = []
    dislikelist = []
    for booth in booths:
        if booth.booth_id in A:
            likelist.append(booth)
        else:
            dislikelist.append(booth)
    print(likelist)
    print(dislikelist)
    print('여긴어때', A)
    print("A 타입:", type(A))
    return templates.TemplateResponse("booth_list.html", {"request": request, "likelist": likelist, "dislikelist": dislikelist})

# heartStates 값을 처리하는 POST 요청
