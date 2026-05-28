from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from typing import Optional

class PostBase(SQLModel):
    title: str
    content_text: Optional[str] = None

class PostCreate(PostBase):
    topic_id: int

class Post(PostBase, table=True):
    __tablename__ = "posts"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    author_id: UUID = Field(foreign_key="users.id")
    topic_id: int = Field(foreign_key="topics.id")

class PostResponse(PostBase):
    id: UUID
    author_id: UUID
    topic_id: int
