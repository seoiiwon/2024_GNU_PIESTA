from fastapi import APIRouter, Request, Depends, status, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from sqlalchemy.orm import Session
from config.database import get_db
from models.models import Test
from datetime import datetime

router = APIRouter(tags=["백엔드 예시"])

templates = Jinja2Templates(directory="templates/main")

# Post를 위한 스키마 -> db에 직접 저장을 해야하는 즉, id와 같이 직접 저장을 하지 않아도 되는 요소를 제외한 전부가 필요함
# 예를들어 음식점에서 손님이 메뉴를 주문하면 (이 부분은 프론트에서 진행)
# 백엔드는 요리사가 되어 손님이 요청한 것을 만들어줘야 함
# datatype은 음식점에서 준비해둘 그릇의 종류가 됨, property는 손님이 주문한 음식
# 손님이 짜장면(property)를 주문하면 짜장면을 담는 그릇(property)에 담아서 손님에게 전달
class TestPost(BaseModel): 
    title: str
    time: datetime

# 여기서는 삭제할 항목의 요소를 식별할 수 있는 값을 클라이언트로부터 받아내야함
# id, title, time 중에 해당 글을 삭제하기 위해서는 뭐가 적당할까?
# title이 겹칠수도 있고, 동시에 글을 올릴 수도 있음
# 따라서 id로 삭제를 하는게 가장 좋음
class TestDelete(BaseModel):
    id : int


@router.post("/test/post", status_code=status.HTTP_201_CREATED) # 어떤 경로에서 사람들이 post를 할 수 있도록 할것인지 + 성공시 어떤 상태를 나타낼지 설정
async def testPost(postSchema : TestPost, db : Session=Depends(get_db)): # 메뉴와 그릇 대기 (스키마) + 손님을 받을 테이블 마련 (Database 테이블)
    # 비어있는 쓰레기 값도 저장이 되는 것을 막기 위해 검열하는 조건문
    if (not postSchema.title or postSchema.title.strip() == ""):
        raise HTTPException(status_code=400, detail="글을 쓰고 등록을 해달라고 하세요 좀..") # 상태코드는 docs에서 백엔드 개발자에게 큰 도움이 됩니다.
    
    try: # 빈 값이 아니다? -> db 저장 실시
        newPost = Test(
            title = postSchema.title,
            time = datetime.now()
        ) # 손님이 주문한 음식을 주문서에 받아주세요
        db.add(newPost) # 주문서에 받은 주문을 주방에 넘겨주고 요리하기
        db.commit() # 주문 완성 알리기
        db.refresh(newPost) # 손님들 테이블에 잘 계시나 안부인사 (필수 아님)
    except Exception: # 만약 요리사 역량이 부족한 경우
        db.rollback() # 환불해주기 - 롤백 상태 변화 이전의 DB로 되돌리는 작업
        raise HTTPException(status_code=500, detail="지송... 글을 작성하지 못해써요....") # 역량 부족임을 상태코드로 확인하기
    
    return newPost # 서버에서 잘 처리되었는지 확인하기 위한 반환값 (필수 아님)

@router.get("/test/get/all", status_code=status.HTTP_200_OK) # 경로 설정 + 성공했을 때 보고싶은 상태코드 설정
async def testGetAll(db : Session=Depends(get_db)): # 손님들이 뭘 먹고있는지 파악할 테이블 준비
    try:
        testAll = db.query(Test).order_by(Test.time.desc()).all() # 전부 가져오기 -> 시간 내림차순
        return testAll 
    except Exception:
        raise HTTPException(status_code=500, detail="아이고... 글을 불러오지 못했습니다...") # 실패하면 500에러

@router.get("/test/get/one", status_code=status.HTTP_200_OK) # 사용자가 요청한 키워드에 해당하는 글을 불러오고 싶다면?
async def testGetOne(keyword : str, db : Session=Depends(get_db)): # keyword를 쿼리 매개변수로 입력받도록 한다.
    testOne = db.query(Test).filter(Test.title == keyword).order_by(Test.time.desc()).all() # 키워드로 필터링을 하고 내림차순으로 정렬 후 해당하는 전체를 불러오기
    if not testOne:
        raise HTTPException(status_code=404, detail="Not Found!!!!!!!!!!! 당신이 찾는거 여기 없어")
    try:
        return testOne
    except Exception:
        raise HTTPException(status_code=500, detail="글이 있긴 한 것 같은데 제가 못 찾겠어요.... 네? 사장님 불러오라고요?") # 실패하면 500에러

@router.get("/test/get/byhtml", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def testGetByHTML(request : Request, db : Session=Depends(get_db)): # 여기서는 request가 생겼어요 이유는 아래에서
    testByHTML = db.query(Test).order_by(Test.time.desc()).all()
    try:
        return templates.TemplateResponse( # templates 변수는 jinja2에서 선언해준 변수임
            name="test.html", # 어떤 html에 넘겨줄지 정하기
            context={
                # jinja2와 같은 템플릿 엔진은(HTML에서 끌어다 쓰기 위한 도구) request(누가 보냈어!)를 필수로 요구함 fastapi가 제가 보낸거에요~ 해주는 것
                "request" : request,
                "nameForHTML" : testByHTML # 프론트 개발자가 가져가서 쓰기만 할 수 있도록 이쁜 이름을 지어준다 나는 nameForHTML로 했음
            }
        )
    except:
        raise HTTPException(status_code=500, detail="제가 백엔드라 HTML을 잘 몰라요.. 제가 값을 잘못 넘겨줬나봐요 프론트는 잘못 없어요..") # 실패하면 500에러


@router.delete("/test/delete", status_code=status.HTTP_202_ACCEPTED)
async def testDelete(deleteSchema : TestDelete, db : Session=Depends(get_db)):
    iwanttodeletethispost = db.query(Test).get(deleteSchema.id)
    if not iwanttodeletethispost: # 삭제할 항목이 없는 경우 남탓에러 발생시키기
        raise HTTPException(status_code=404, detail="당신이 삭제하려는거 없는디요")
    
    try:
        db.delete(iwanttodeletethispost)
        db.commit()
    except Exception:
        db.rollback()
        HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

