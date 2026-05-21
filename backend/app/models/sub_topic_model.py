from sqlalchemy import Column, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class SubTopic(Base):
    __tablename__ = "subs_to_topics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    topic_id = Column(Integer, nullable=False)
