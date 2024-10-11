from sqlalchemy.orm import Session
from sqlalchemy import inspect
from config.database import engine, SessionLocal, Base
from models.models import Booth

def init_db():
    inspector = inspect(engine)

    # 테이블이 존재하지 않을 때만 생성
    if not inspector.has_table("booths"):
        print("테이블 생성 중...")
        Base.metadata.create_all(engine)
    else:
        print("테이블이 이미 존재합니다. 생성하지 않습니다.")

    # 기본 데이터 삽입
    with SessionLocal() as session:
        try:
            insert_default_booths(session)
        except Exception as e:
            print(f"데이터 삽입 중 오류 발생: {e}")

def insert_default_booths(session: Session):
    booths = [
            Booth(
                booth_name='BOB!',
                booth_description="""""",
                location_description='컨벤션 센터 앞 20번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True
            ),
            Booth(
                booth_name='Polaroid in love',
                booth_description="""🫧Polaroid in love🫧

            안녕하세요 10월 16일, 18일 (2일간) 
            축제의 소중한 순간을 사진으로 담을 수 있는 폴라로이드 사진 부스를 진행합니다! 📷

            폴라로이드 사진을 찍고 직접 꾸밀 수 있는 공간도 마련되어 있으니,
            여러분의 소중한 추억을 기록해보세요💕✨""",
                location_description='푸드 트럭 주변 45번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=False,
                is_operating_on_18th=True,
                booth_poster='폴인럽'
            ),
            Booth(
                booth_name='해피빌더스',
                booth_description="""해피빌더스 부스에 오신 것을 환영합니다!
            우리 해피빌더스는 여러분과 함께 즐거운 시간을 보 내기 위해 다양한 미니게임을 준비했습니다. 대형 젠가 미션과 미니 양궁, 몇 센치인지 맞히기 게임을 통해 친구들과 함께 도전해 보세요!
            부스에서 진행되는 모든 게임은 협동과 즐거움을 바탕으로 만들어졌으며, 참여하시는 모든 분들께 소중한 추억을 선사할 것입니다.
            봉사자들이 친절하게 안내해 드리니, 부담 없이 찾아와 주세요. 참가하신 분들께는 작은 선물도 준비 되어 있으니 기대하셔도 좋습니다!
            행복을 쌓아 올리는 해피빌더스 부스에서 여러분을 기다립니다!""",
                location_description='컨벤션 센터 앞 32번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=False,
                booth_poster='해피빌더스'
            ),
            Booth(
                booth_name='그릴자유',
                booth_description="""경상국립대학교 그림 동아리 그릴자유입니다.

            이번 대동제 부스에서는 저희의 다양한 그림과 창작물을 전시하여 편하게 감상하실 수 있으며, 축제를 더욱 특별하게 즐길 수 있도록 커스텀 가능한 페이스페인팅을 진행합니다. 또한, 저희가 직접 제작한 귀여운 굿즈도 판매 중이니 많은 관심 부탁드립니다.""",
                location_description='취식존 앞 44번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='그릴자유'
            ),
            Booth(
                booth_name='공군 학군단',
                booth_description="""공군 학군단 체험 부스에서 다양한 체험을 즐겨보세요! 비비탄 사격, 퀴즈 도전, 그리고 폴라로이드 기념사진 촬영으로 특별한 순간을 남길 수 있습니다. 푸짐한 상품도 준비되어 있으니 놓치지 마세요!""",
                location_description='테니스장 앞 42번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='홍보 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='공군'
            ),
            Booth(
                booth_name='공대 요리사',
                booth_description="""저희 공대요리사는 떡볶이와 핫도그를 기똥찬 맛, 정직한 가격에 판매하고 있습니다! 그리고 다양한 이벤트도 많이 하고 있으니 다들 오셔서 맛있게 드셔주시면 감사하겠습니다. 합격할 것인가, 탈락할 것인가..""",
                location_description='컨벤션 센터 앞 30번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='공대요리사'
            ),
            Booth(
                booth_name='뽀까뽀까(경영자들)',
                booth_description="""찐또배기 철판 요리와 레전드 붕어빵의 등장""",
                location_description='컨벤션 센터 앞 28번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='경영자들'
            ),
            Booth(
                booth_name='당신의 심장에 붕어빵야',
                booth_description="""대동제 3일동안 붕어빵 판매합니당~💕 붕어빵의 근본 팥붕슈붕과 💫매일 달라지는 새로운 붕어빵💫들도 있으니 “당신의 심장에 붕어빵야🔫” 꼭 찾아와주세용~~""",
                location_description='컨벤션 센터 앞 26번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='붕어빵야'
            ),
            Booth(
                booth_name='너나누리 X 경상국립대학교 장애학생지원센터',
                booth_description="""""",
                location_description='체육관 앞 46번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=False,
                is_operating_on_17th=False,
                is_operating_on_18th=True,
                booth_poster='너나누리'
            ),
            Booth(
                booth_name='절즈',
                booth_description="""축제 하면 음주가 빠지지 않고 등장을 하는데요! 
            2024년 대동제! 건강증진개발원 소속 절주 서포터즈 경상국립대 '절즈'팀이 함께 합니다! 이번 축제도 건강하고 안전하게 그리고 즐겁게 즐겨봅시다!🤩
            부스에 방문하시면 다양한 절주 정보들과 퀴즈 그리고 인스타그램 이벤트를 준비할 예정이오니 많은 관심과 방문 부탁드립니다! 

            문의 사항은 @jeol_z_로 보내주세요!""",
                location_description='컨벤션 센터 앞 18번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='홍보 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=False,
                is_operating_on_18th=False,
                booth_poster='절즈'
            ),
            Booth(
                booth_name='UNAI ASPIRE GNU 경상국립대지부',
                booth_description="""UNAI ASPIRE GNU 입니다!
            우리 함께 SDGs 를 해결해 보아요 : )""",
                location_description='컨벤션 센터 앞 27번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='UNAI'
            ),
            Booth(
                booth_name='칠차삼정',
                booth_description="""일상생활에서 차를 더 친근하게 접할 수 있도록 노력하는 칠차삼정입니다. 이번 저희 부스에서는 말차 라떼, 레몬녹차에이드, 자몽홍차에이드 세 가지의 차를 이용한 음료를 판매합니다. 평소 차를 접하지 못하셨던 분들도, 차를 좋아하셔서 즐기시는 분들도 맛있게 드실 수 있는 메뉴로 선정하였습니다! 부디 부스에 방문하셔서 차와 함께 즐거운 대동제의 추억을 만들어가셨으면 좋겠습니다.""",
                location_description='테니스장 앞 40번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=False,
                booth_poster='칠차삼정'
            ),
            Booth(
                booth_name='WIDE 패션동아리',
                booth_description="""안녕하세요. 패션동아리 와이드입니다! 저번 오월제에서와 같이 이번 대동제때도 플리마켓을 개최하게 되었습니다. 부원들의 독특한 의류들과 메이저 브랜드 등 많은 의류들이 저렴한 가격대에 준비되어있으니 많은 관심 부탁드립니다!!""",
                location_description='대학 본부 건물 앞 36번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='WIDE'
            ),
            Booth(
                booth_name='순간 잡화점',
                booth_description="""안녕하십니까 경상국립대학교 사진동아리 ‘순간’입니다.

            동아리원 분들이 직접 촬영한 사진들로 굿즈로 만들어 판매하는 ‘순간 잡화점’

            ‘순간’ 동아리의 직접 촬영한 사진들이 어떤 형태의 굿즈로 만들어졌는지,
            어떤 사진들이 있는지,
            어떤 컨텐츠들이 준비되어 있는지,

            그럼 순간 동아리의 추억이 담긴 현장으로 여러분을 초대합니다.""",
                location_description='컨벤션 센터 앞 22번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='수'
            ),
            Booth(
                booth_name='아메리칸 셰프',
                booth_description="""영화 '아메리칸 셰프'에서 나온 음식을 눈앞에서 만들어 대동제에 추억을 새겨드리겠습니다.""",
                location_description='컨벤션 센터 앞 31번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='셰프'
            ),
            Booth(
                booth_name='오야',
                booth_description="""일본식 야끼토리를 경험해 보고 싶거나 진주에서 맛있기로 소문한 술집의 메뉴들을 경험해 보고 싶다면 저희 부스로 와주세요""",
                location_description='컨벤션 센터 앞 29번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='체험 부스',
                is_operating_on_16th=False,
                is_operating_on_17th=True,
                is_operating_on_18th=False,
                booth_poster='오야'
            ),
            Booth(
                booth_name='오드아이즈 게코',
                booth_description="""안녕하세요, 이번에 제가 키우는 크레스티드게코를 여려분들께 보여드리게 된 오드아이즈라고 합니다.

            제가 부스를 열기로 결심한 계기가 있는데요, 작년에 휴학하면서 학생분들 대다수가 크레스티드게코를 매체로만 접하고 실제로는 보지는 못한 분들이 많았다는 것을 알게 되었습니다. 크레스티드게코는 간편한 사육 덕분에 최근 새롭게 각광받고 있는 반려동물이며 경기도, 수도권에서는 크레스티드게코의 인기가 엄청납니다. 그래서 전 부스를 통해 많은 학생분들께 크레스티드게코란 반려동물이 가지는 매력을 보여드리고자합니다.

            부스에 오시면 성체와 제가 직접 부화시킨 아이들도 볼 수 있고 평소 크레스티드게코에 대해 궁금한 점, 크레스티드게코 사육에 관해서 알려드리는 것은 물론 분양도 소수 진행할 예정입니다.

            크레스티드게코를 직접 보고 싶으신 분들은 18일 단 하루만 열리는 오드아이스 부스로 놀러오세요!!!""",
                location_description='대학 본부 건물 앞 35번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=False,
                is_operating_on_17th=False,
                is_operating_on_18th=True,
                booth_poster='게코'
            ),
            Booth(
                booth_name='방씨네 츄러스',
                booth_description="""방씨네 과일에 이어서 방씨네 츄러스를 시작했습니다~!! 다양한 컨셉과 맛으로 승부를 볼테니 많이많이 찾아와주세요 😎😎""",
                location_description='농구장 앞 37번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='방씨네츄러스'
            ),
            Booth(
                booth_name='사랑의 지누핑 캐리커쳐',
                booth_description="""🐰뜬겁새로 찾아온-? 캐리커쳐핑 !!🐰

            캐리커쳐는 물론 그림네컷까지?
            천오백원에 나도 “하츄핑”이 되...🪽

            오직 이틀간 한정수량으로 준비 된
            특급 🫢 이벤트 💕 까지 ✨
            준비 갈 완료 !!

            +안오면😿😓우리 🙀배고배고..슬픔슬픔..💦""",
                location_description='대학 본부 건물 앞 35번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=False,
                booth_poster='지누핑'
            ),
            Booth(
                booth_name='은삼이네',
                booth_description="""20대 자기계발과 마음건강을 다루는 일상툰 [은삼이네 성장일기]입니다.

            유유히 떠다니는 해파리에서 영감을 받아 만든 은삼이는 자유롭게, 나답게 살아간답니다.

            나다움과 자유를 담아 만든 은삼이네 굿즈를 함께 즐겨주세요🫧""",
                location_description='취식존 앞 43번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='은삼이네'
            ),
            Booth(
                booth_name='햄버거님 자몽소다?',
                booth_description="""충성! 저희는 군대 컨셉 카페 햄버거님 자몽소다?(행보관님 잘못들었습니다?) 입니다!
            저희는 부대 컨셉에 맞는 여러 음료를 판매할 예정이며 음료 구매시 햄버거 젤리도 같이 드릴 예정입니다. 미니게임(사격)을 통해 상품 이벤트도 준비되어있고 체험행사로는 화로에 마시멜로 구워먹기도 가능합니다!
            PX처럼 저렴한 가격으로 맛있는 시간 보낼 수 있으니 많은 관심 부탁드립니다!
            필승!""",
                location_description='컨벤션 센터 앞 29번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=False,
                is_operating_on_18th=False,
                booth_poster='햄소다'
            ),
            Booth(
                booth_name='캉포즈커피',
                booth_description="""선배 ~ 솜사탕 사주세요 !

            응 솜사탕?

            아이스티도 같이?

            그럼 제가 선배맘에 ~ 캉 캉 캉

            캉포즈 커피입니다. 솜사탕, 아이스티, 아메리카노, 에이드까지 모두 2000원에 준비되어 있으니 많이 찾아주세요 ~""",
                location_description='컨벤션 센터 앞 21번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=False,
                booth_poster='캉포즈'
            ),
            Booth(
                booth_name='동그리',
                booth_description="""금이, 동식이 키링 등 회원들이 직접 찍고 그린 사진과 그림으로 만든 굿즈 판매
            동물보호법 위반 사례 형량 맞추기 모의재판 게임을 진행합니다!""",
                location_description='대학 본부 건물 앞 34번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='동그리'
            ),
            Booth(
                booth_name='경대 요리사',
                booth_description="""주간부스
            급변하는 지구! 미래에는 어떤 식량을 먹게 될까?
            지속 가능한 식량 자원 확보는 전 세계적인 화두입니다. 미래 식량의 대안으로 주목받고 있는 곤충과 파충류는 높은 영양가와 환경에 미치는 영향이 적은 특징을 가지고 있습니다. 주간 체험 활동에서는 여러분이 직접 곤충 식품과 파충류 식품을 맛보며, 친환경적이고 지속 가능한 식품에 대해 알아보는 시간을 가질 수 있습니다. 미래 식량의 가능성을 탐험하고, 새로운 미식의 세계에 도전해보세요!

            야간부스 
            PIESTA에서 즐기는 일본의 맛!
            일본의 대표적인 길거리 음식을 맛볼 수 있는 특별한 시간을 준비했습니다. 따끈한 국물이 일품인 라멘, 부드럽고 쫄깃한 염통꼬치, 그리고 고소한 풍미가 가득한 닭꼬치까지! 밤의 분위기와 함께 일본의 매력을 한껏 느낄 수 있는 기회를 놓치지 마세요. 친구, 가족과 함께 오셔서 따뜻한 음식과 함께 추억을 만들어보세요!""",
                location_description='농구장 앞 38번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='먹거리 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='경대요리사'
            ),
            Booth(
                booth_name='수',
                booth_description="""안녕하세요. 디자인 동아리 수(秀)입니다!

            저희 부스에서는 직접 만든 목걸이, 해파리 키링, 코스터를 판매합니다. 

            1. 플러팅의 어원을 아세요? ••• 목걸이 5,000원
            2. 해파리는 심장이 없다. ••• 키링 5,000원
            3. 바다를 마시는 법 ••• 코스터 5,000원

            이 질문들에 대한 답을 아시나요?
            함께 들어있는 책갈피 속에서 답을 확인해보세요!

            +) 코스터는 청바지를 업사이클링해 만들었어요!
            구매를 통해 지구를 위한 실천에 동참하실 수 있습니다. 🌏""",
                location_description='대학 본부 건물 앞 33번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='플리마켓 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='수'
            ),
            Booth(
                booth_name='진주시 보건소',
                booth_description="""""",
                location_description='컨벤션 센터 앞 17번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='홍보 부스',
                is_operating_on_16th=False,
                is_operating_on_17th=True,
                is_operating_on_18th=False
            ),
            Booth(
                booth_name='다정',
                booth_description="""🫧 안녕하세요! 저희는 교육봉사 동아리 다정입니다! 저희 동아리 '다정'은 '다함께 정답게'라는 슬로건을 바탕으로 세계 전통 놀이 체험과 의상 체험 부스를 운영합니다!🫧

            🍀 켄다마 : 집중력과 균형감각을 키워주는 일본 전통 놀이에 도전해 보세요!

            🍀 투호 : 조준력을 테스트할 수 있는 한국과 중국의 전통놀이에 도전해 보세요!

            🍀 전통 의상 체험 : 다양한 나라의 전통 의상을 직접 입어보고 사진도 찍어보세요!""",
                location_description='테니스장 앞 41번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='다정'
            ),
            Booth(
                booth_name='방울방울 CAFE',
                booth_description="""핸드메이드 카페 방울방울입니다.

            직접 홍차를 끓여서 만든 밀크티

            직접 담가 만든 바질토마토에이드

            화분 컵케이크, 휘낭시에

            귀엽고 맛있는 디저트와 함께하는 방울방울 cafe로 놀러 오세요!""",
                location_description='농구장 앞 39번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='방울방울'
            ),
            Booth(
                booth_name='글로엣',
                booth_description="""""",
                location_description='컨벤션 센터 앞 19번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='잡화 판매 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True
            ),
            Booth(
                booth_name='타로세이',
                booth_description="""""",
                location_description='컨벤션 센터 앞 25번 부스',
                operation_hours='11:00 ~ 22:00',
                booth_category='체험 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True
            ),
            Booth(
                booth_name='진주문화관광재단',
                booth_description="""""",
                location_description='컨벤션 센터 앞 24번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='홍보 부스',
                is_operating_on_16th=True,
                is_operating_on_17th=True,
                is_operating_on_18th=True
            ),
            Booth(
                booth_name='보라소라(생활협동조합)',
                booth_description="""안녕하세요 경상국립대학교 생활협동조합 학생위원회 보라소라입니다🙇""",
                location_description='음컨벤션 센터 앞 18번 부스',
                operation_hours='11:00 ~ 18:00',
                booth_category='홍보 부스',
                is_operating_on_16th=False,
                is_operating_on_17th=True,
                is_operating_on_18th=True,
                booth_poster='보라소라'
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
