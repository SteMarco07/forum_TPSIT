from sqlalchemy import Column, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class LikeComment(Base):
    __tablename__ = "likes_on_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    comment_id = Column(UUID(as_uuid=True), nullable=False)
