from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from typing import Optional

class CommentBase(SQLModel):
    content_text: str

class CommentCreate(CommentBase):
    post_id: UUID

class Comment(CommentBase, table=True):
    __tablename__ = "comments"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    author_id: UUID = Field(foreign_key="users.id")
    post_id: UUID = Field(foreign_key="posts.id")
    model_config = {"from_attributes": True, "extra": "allow"}

class CommentResponse(CommentBase):
    id: UUID
    author_id: UUID
    post_id: UUID
    author_username: str