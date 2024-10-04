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



class Comment(Base):
    __tablename__ = "comment"

    name = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    text= Column(String, nullable=False)