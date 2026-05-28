from sqlmodel import SQLModel, Field
from uuid import UUID

class LikeCommentBase(SQLModel):
    comment_id: UUID

class LikeComment(LikeCommentBase, table=True):
    __tablename__ = "likes_on_comments"

    id: int = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    comment_id: UUID = Field(foreign_key="comments.id")

class LikeCommentResponse(LikeCommentBase):
    id: int
    user_id: UUID