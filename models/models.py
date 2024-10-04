from sqlalchemy import *
from config.database import Base

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

    name = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    text= Column(String, nullable=False)