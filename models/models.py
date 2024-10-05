from sqlalchemy import *
from config.database import Base
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum

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
    category = Column(String[10], nullable=False)
    title = Column(String[20], nullable=False)
    content = Column(String[300], nullable=False)


class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    text = Column(String, nullable=False)

class BoothCategory(PyEnum):
    FOOD = "먹거리"
    EXPERIENCE = "체험"
    OTHER = "기타"


class Booth(Base):
    __tablename__ = "booths"

    booth_id = Column(Integer, primary_key=True, autoincrement=True)
    booth_name = Column(String(100), nullable=False)
    organizer = Column(String(100), nullable=False)
    instagram_id = Column(String(100), nullable=True)
    booth_description = Column(Text, nullable=False)
    location_description = Column(String(255), nullable=False)
    operation_hours = Column(String(100), nullable=False)
    booth_category = Column(Enum(BoothCategory), nullable=False)

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