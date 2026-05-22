from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional

# Shared base — fields common to all variants
class TopicBase(SQLModel):
    title: str
    description: str
    rules: str

# Input schema — what POST /topics accepts (replaces TopicCreate)
class TopicCreate(TopicBase):
    pass

# DB table — table=True makes SQLModel treat this as a SQLAlchemy model
class Topic(TopicBase, table=True):
    __tablename__ = "topics"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    author_id: UUID = Field(foreign_key="users.id")

# Output schema — what the API returns (replaces TopicResponse)
class TopicResponse(TopicBase):
    id: UUID
    author_id: UUID