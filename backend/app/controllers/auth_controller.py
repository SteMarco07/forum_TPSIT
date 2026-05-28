from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user_model import User                # ← no more separate schema import
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token

def login(data: LoginRequest, db: Session) -> TokenResponse:
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token)