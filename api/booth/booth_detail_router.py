import os
from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from config.database import get_db
from models.models import Booth
from sqlalchemy.orm import Session
from urllib.parse import unquote

router = APIRouter(tags=["BOOTH"])


templates = Jinja2Templates(directory="./templates/booth")

@router.get("/booth/detail/{booth_name}", response_class=HTMLResponse, name="get_booth_detail")
async def get_booth_detail(booth_name: str, request: Request, db: Session = Depends(get_db)):
    booth = db.query(Booth).filter(Booth.booth_name == booth_name).first()

    if not booth:
        return HTMLResponse(content="부스를 찾을 수 없습니다.", status_code=404)

    if booth.booth_poster:
        jpeg_path = f"./static/images/{booth.booth_poster}.jpeg"
        png_path = f"./static/images/{booth.booth_poster}.png"

        if os.path.exists(jpeg_path):
            booth_image = f"{booth.booth_poster}.jpeg"
        elif os.path.exists(png_path):
            booth_image = f"{booth.booth_poster}.png"
        else:
            booth_image = ""  
    else:
        booth_image = "" 

    return templates.TemplateResponse("booth_detail.html", {"request": request, "booth": booth, "booth_image": booth_image})
