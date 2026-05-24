from sqlmodel import SQLModel, Field
from uuid import UUID

class LikePostBase(SQLModel):
    post_id: UUID

class LikePost(LikePostBase, table=True):
    __tablename__ = "likes_on_posts"

    id: int = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    post_id: UUID = Field(foreign_key="posts.id")

class LikePostResponse(LikePostBase):
    id: int
    user_id: UUID
