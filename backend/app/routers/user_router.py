from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user_schema import UserCreate, UserResponse
from app.controllers import user_controller
from app.core.dependencies import get_current_user
from app.models.user_model import User

router = APIRouter(prefix="/users", tags=["Users"])

# Public route — no auth
@router.post("/", response_model=UserResponse, status_code=201)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    return user_controller.create_user(data, db)

# Protected route — requires valid JWT
@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Protected route — any authenticated user can list users
@router.get("/", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),   # _ means "required but unused"
):
    return user_controller.get_all_users(db)
