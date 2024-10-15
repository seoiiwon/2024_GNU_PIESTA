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
from api.main import notice
from config.booth_data import init_db  


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine) 
    init_db()
    
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
app.include_router(notice.router)


# @app.get("/favicon.ico", include_in_schema=False)
# async def favicon():
#     return FileResponse("favicon.ico")


# HOST = "0.0.0.0"
# PORT = 80
HOST = "127.0.0.1"
PORT = 8000 


if __name__ == "__main__":
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
