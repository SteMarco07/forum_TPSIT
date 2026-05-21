from sqlalchemy import Column, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class LikePost(Base):
    __tablename__ = "likes_on_posts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    post_id = Column(UUID(as_uuid=True), nullable=False)
