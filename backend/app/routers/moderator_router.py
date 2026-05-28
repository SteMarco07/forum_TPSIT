from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.moderator_model import ModeratorCreate, ModeratorResponse
from app.controllers import moderator_controller
from app.core.dependencies import require_role

router = APIRouter(prefix="/moderators", tags=["Moderators"])

@router.get("/topic/{topic_id}", response_model=list[ModeratorResponse])
def get_moderators(topic_id: int, db: Session = Depends(get_db)):
    return moderator_controller.get_moderators_by_topic(topic_id, db)

@router.get("/{moderator_id}", response_model=ModeratorResponse)
def get_moderator(moderator_id: int, db: Session = Depends(get_db)):
    return moderator_controller.get_moderator_by_id(moderator_id, db)

@router.post("/", response_model=ModeratorResponse, status_code=201)
def assign_moderator(
    data: ModeratorCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_role("ADMIN")),
):
    return moderator_controller.assign_moderator(data, db)

@router.patch("/{moderator_id}", response_model=ModeratorResponse)
def update_moderator_role(
    moderator_id: int,
    role: Optional[str] = None,
    db: Session = Depends(get_db),
    _: dict = Depends(require_role("ADMIN")),   # only admins can update
):
    return moderator_controller.update_moderator_role(moderator_id, role, db)

@router.delete("/{moderator_id}", status_code=204)
def remove_moderator(
    moderator_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_role("ADMIN")),
):
    moderator_controller.remove_moderator(moderator_id, db)
