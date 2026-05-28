from sqlmodel import SQLModel, Field
from uuid import UUID

class SubTopicBase(SQLModel):
    topic_id: int

class SubTopic(SubTopicBase, table=True):
    __tablename__ = "subs_to_topic"

    id: int = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    topic_id: int = Field(foreign_key="topics.id")

class SubTopicResponse(SubTopicBase):
    id: int
    user_id: UUID