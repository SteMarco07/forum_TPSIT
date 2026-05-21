from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Moderator(Base):
    __tablename__ = "moderators"

    id = Column(Integer, primary_key=True, autoincrement=True)
    role = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    topic_id = Column(Integer, nullable=False)
