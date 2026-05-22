from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TopicCreate(BaseModel):
    title: str
    description: str
    rules: str

class TopicResponse(BaseModel):
    id: int
    title: str
    description: str
    rules: str
    author_id: UUID

    model_config = {"from_attributes": True}
    
