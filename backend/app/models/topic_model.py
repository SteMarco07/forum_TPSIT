from sqlalchemy import Column, String, Text, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text
from app.database import Base

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=False)
    rules = Column(Text, nullable=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.uuid"), nullable=False)
