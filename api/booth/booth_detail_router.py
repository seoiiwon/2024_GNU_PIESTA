from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from config.database import get_db
from models.models import Booth
from sqlalchemy.orm import Session

router = APIRouter(tags=["BOOTH"])


templates = Jinja2Templates(directory="./templates/booth")


@router.get("/booth/detail", response_class=HTMLResponse)
async def get_booth_detail(booth_name: str, request: Request, db: Session = Depends(get_db)):
    # 데이터베이스에서 부스 이름으로 부스 정보를 조회
    booth = db.query(Booth).filter(Booth.booth_name == booth_name).first()

    if not booth:
        return HTMLResponse(content="부스를 찾을 수 없습니다.", status_code=404)

    # booth_detail.html 템플릿을 렌더링하면서 부스 데이터를 전달
    return templates.TemplateResponse("booth_detail.html", {"request": request, "booth": booth})