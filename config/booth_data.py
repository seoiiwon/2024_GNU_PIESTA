from sqlalchemy.orm import Session
from config.database import engine, SessionLocal, Base
from models.models import Booth, BoothMenu

def init_db():
    # 데이터베이스 테이블 생성
    Base.metadata.create_all(engine)
    
    # 데이터베이스 세션 생성 및 기본 데이터 삽입
    with SessionLocal() as session:
        try:
            insert_default_booths(session)
            insert_default_menus(session)
        except Exception as e:
            print(f"데이터 삽입 중 오류 발생: {e}")

def insert_default_booths(session: Session):
    booths = [
        Booth(
            booth_name='식품공작소',
            organizer='식품공학과',
            instagram_id=None,
            booth_description='식품공작소는 경상국립대 식품공학과 학생들이 직접 기획하고 운영하는 부스입니다. 사람과 동물을 위한 다양한 식품을 고민하고 연구하는 이곳에서, 이번 대동제를 맞아 소개하는 특별한 제품들을 만나보세요!',
            location_description='452동과 교양동 사이 오르막',
            operation_hours='11:00 ~ 16:00',
            booth_category='먹거리'  # 문자열로 변경
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

def insert_default_menus(session: Session):
    menus = [
        {
            "booth_name": "식품공작소",
            "item": "소떡소떡",
            "price": 3500
        }
    ]

    for menu in menus:
        booth = session.query(Booth).filter_by(booth_name=menu["booth_name"]).first()
        if booth:
            existing_menu = session.query(BoothMenu).filter_by(item=menu["item"], booth_id=booth.booth_id).first()
            # if existing_menu:
            #     print(f"메뉴 '{menu['item']}'는 이미 존재합니다.")
            # else:
            #     new_menu = BoothMenu(
            #         booth_id=booth.booth_id,
            #         item=menu["item"],
            #         price=menu["price"]
            #     )
            #     session.add(new_menu)
            #     print(f"메뉴 '{menu['item']}'을 추가합니다.")
        else:
            print(f"부스 '{menu['booth_name']}'가 존재하지 않습니다.")

    session.commit()

# 데이터베이스 초기화 호출
if __name__ == "__main__":
    init_db()
