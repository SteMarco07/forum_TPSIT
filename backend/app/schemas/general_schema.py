from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class PostFullResponse(BaseModel):
    id: UUID
    title: str
    content_text: Optional[str] = None
    author_id: UUID
    topic_id: int
    author_username: str
    topic_name: str
    likes_count: int
    comments_count: int

    model_config = {"from_attributes": True}


