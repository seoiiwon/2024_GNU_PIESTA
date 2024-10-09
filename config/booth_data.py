from sqlalchemy.orm import Session
from config.database import engine, SessionLocal, Base
from models.models import Booth

def init_db():
    # 데이터베이스 테이블 생성
    Base.metadata.create_all(engine)
    
    # 데이터베이스 세션 생성 및 기본 데이터 삽입
    with SessionLocal() as session:
        try:
            insert_default_booths(session)
        except Exception as e:
            print(f"데이터 삽입 중 오류 발생: {e}")

def insert_default_booths(session: Session):
    booths = [
        Booth(
            booth_name='공대 요리사',
            booth_description='저희 공대요리사는 떡볶이와 핫도그를 기똥찬 맛, 정직한 가격에 판매하고 있습니다! 그리고 다양한 이벤트도 많이 하고 있으니 다들 오셔서 맛있게 드셔주시면 감사하겠습니다. 합격할 것인가, 탈락할 것인가..',
            location_description='N/A', 
            operation_hours='11:00 ~ 22:00',
            booth_category='먹거리 판매 부스',
            is_operating_on_16th=True,
            is_operating_on_17th=True,
            is_operating_on_18th=True
        ),
        Booth(
            booth_name='Polaroid in love (폴인럽)',
            booth_description='🫧Polaroid in love🫧\n\n안녕하세요 10월 16일, 18일 (2일간) 축제의 소중한 순간을 사진으로 담을 수 있는 폴라로이드 사진 부스를 진행합니다! \n\n폴라로이드 사진을 찍고 직접 꾸밀 수 있는 공간도 마련되어 있으니, 여러분의 소중한 추억을 기록해보세요💕✨',
            location_description='N/A',
            operation_hours='11:00 ~ 18:00',
            booth_category='플리마켓 부스',
            is_operating_on_16th=True,
            is_operating_on_17th=False,
            is_operating_on_18th=True
        ),
        Booth(
            booth_name='해피 플레이 그라운드 (해피빌더스)',
            booth_description='해피빌더스 부스에 오신 것을 환영합니다!\n우리 해피빌더스는 여러분과 함께 즐거운 시간을 보 내기 위해 다양한 미니게임을 준비했습니다. 대형 젠가 미션과 미니 양궁, 몇 센치인지 맞히기 게임을 통해 친구들과 함께 도전해 보세요!\n부스에서 진행되는 모든 게임은 협동과 즐거움을 바탕으로 만들어졌으며, 참여하시는 모든 분들께 소중한 추억을 선사할 것입니다.\n봉사자들이 친절하게 안내해 드리니, 부담 없이 찾아와 주세요. 참가하신 분들께는 작은 선물도 준비 되어 있으니 기대하셔도 좋습니다!\n행복을 쌓아 올리는 해피빌더스 부스에서 여러분을 기다립니다!',
            location_description='N/A',
            operation_hours='11:00 ~ 18:00',
            booth_category='체험 부스',
            is_operating_on_16th=True,
            is_operating_on_17th=True,
            is_operating_on_18th=False
        ),
        Booth(
            booth_name='그릴자유',
            booth_description=' 경상국립대학교 그림 동아리 그릴자유입니다.\n 이번 대동제 부스에서는 저희의 다양한 그림과 창작물을 전시하여 편하게 감상하실 수 있으며, 축제를 더욱 특별하게 즐길 수 있도록 커스텀 가능한 페이스페인팅을 진행합니다. 또한, 저희가 직접 제작한 귀여운 굿즈도 판매 중이니 많은 관심 부탁드립니다.',
            location_description='N/A',
            operation_hours='주간 11:00 ~ 18:00',
            booth_category='체험 부스',
            is_operating_on_16th=True,
            is_operating_on_17th=True,
            is_operating_on_18th=True
        )
      
    ]
    
    for booth in booths:
        existing_booth = session.query(Booth).filter_by(booth_name=booth.booth_name).first()
        if existing_booth:
            print(f"부스 '{booth.booth_name}'는 이미 존재합니다.")
        else:
            session.add(booth)
            print(f"부스 '{booth.booth_name}'를 추가합니다.")

    session.commit()

# 데이터베이스 초기화 호출
if __name__ == "__main__":
    init_db()
