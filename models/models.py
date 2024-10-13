from sqlalchemy import *
from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)


class Test(Base):
    __tablename__ = "test"

    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    time = Column(DateTime, nullable=False)


class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)


class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    text = Column(String, nullable=False)

class Booth(Base):
    __tablename__ = "booths"

    booth_id = Column(Integer, primary_key=True, autoincrement=True)
    booth_name = Column(String(100), nullable=False)
    booth_description = Column(Text, nullable=False)
    location_description = Column(String(255), nullable=False)
    operation_hours = Column(String(100), nullable=False)
    booth_category = Column(String(20), nullable=False)
    booth_poster= Column(String(100), nullable=True)

    # 날짜별 운영 여부
    is_operating_on_16th = Column(Boolean, nullable=False, default=False)
    is_operating_on_17th = Column(Boolean, nullable=False, default=False)
    is_operating_on_18th = Column(Boolean, nullable=False, default=False)

    # One-to-Many relationship with BoothMenu
    menus = relationship("BoothMenu", back_populates="booth")


class BoothMenu(Base):
    __tablename__ = "booth_menu"

    menu_id = Column(Integer, primary_key=True, autoincrement=True)
    booth_id = Column(Integer, ForeignKey("booths.booth_id"), nullable=False)
    item = Column(String(100), nullable=False)
    price = Column(DECIMAL(6, 0), nullable=False)

    # Back reference to Booth
    booth = relationship("Booth", back_populates="menus")

class Faq(Base):
    __tablename__ = "faq"

    id = Column(Integer, primary_key=True, autoincrement=True)
    question = Column(String, nullable=False)
    answer = Column(Text, nullable=False)