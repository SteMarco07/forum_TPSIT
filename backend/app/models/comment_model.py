from sqlalchemy import Column, String, text
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid

class Comment(Base):
    __tablename__ = "comments"

    uuid = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,      # SQLAlchemy generates the UUID in Python
        server_default=text("gen_random_uuid()"),  # fallback for raw SQL inserts
    )
    content = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    post_id = Column(UUID(as_uuid=True), nullable=False)
    