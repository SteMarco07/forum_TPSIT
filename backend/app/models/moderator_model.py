from sqlmodel import SQLModel, Field
from uuid import UUID
from typing import Optional

class ModeratorBase(SQLModel):
    role: Optional[str] = None

class ModeratorCreate(ModeratorBase):
    user_id: UUID
    topic_id: int

class Moderator(ModeratorBase, table=True):
    __tablename__ = "moderators"

    id: int = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    topic_id: int = Field(foreign_key="topics.id")

class ModeratorResponse(ModeratorBase):
    id: int
    user_id: UUID
    topic_id: int