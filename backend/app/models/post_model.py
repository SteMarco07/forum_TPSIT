from sqlalchemy import Column, String, text, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid

class Post(Base):
    __tablename__ = "posts"

    uuid = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,      # SQLAlchemy generates the UUID in Python
        server_default=text("gen_random_uuid()"),  # fallback for raw SQL inserts
    )
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    id_user = Column(UUID(as_uuid=True), nullable=False)
    id_topic = Column(Integer, nullable=False)
    