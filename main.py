import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from config.database import engine, Base
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware

from api.main import home_router, test
from api.booth import booth_detail_router, booth_list_router
from api.comment import comment_router
from api.faq import faq_router
from api.timetable import timetable_router

# from routers import

app = FastAPI()


# CORS 설정 추가
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 또는 허용할 도메인 목록
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# static 폴더 연결
app.mount("/static", StaticFiles(directory="static"), name="static")

# 데이터베이스 초기화
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 포함
app.include_router(home_router.router)
app.include_router(booth_detail_router.router)
app.include_router(booth_list_router.router)
app.include_router(comment_router.router)
app.include_router(faq_router.router)
app.include_router(timetable_router.router)
app.include_router(test.router)


# @app.get("/favicon.ico", include_in_schema=False)
# async def favicon():
#     return FileResponse("favicon.ico")




HOST = "127.0.0.1"
PORT = 8000

if __name__ == "__main__":
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)