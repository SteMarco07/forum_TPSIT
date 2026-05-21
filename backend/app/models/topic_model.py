from sqlalchemy import Column, String, text, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=False)
    rules = Column(String, nullable=False)
