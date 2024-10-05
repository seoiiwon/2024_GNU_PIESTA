from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from config.database import get_db
from models.models import Notice

router = APIRouter(tags=["메인 페이지"])

templates = Jinja2Templates(directory="./templates/main")

@router.get("/test", response_class=HTMLResponse)
async def testRouter(request: Request):
    return templates.TemplateResponse(name="test.html", request=request)

@router.get("/home", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def getHome(request: Request, db: Session=Depends(get_db)):
    notice = db.query(Notice).order_by(Notice.id.desc()).all()
    if (notice):
        try:
            return templates.TemplateResponse(
                name="home.html",
                context={
                    "request" : request,
                    "noticeAll" : notice
                    }
                )
        except:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
