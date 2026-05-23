from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import decode_access_token
from app.models.user_model import User

bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

def require_role(required_role: str):
    def role_checker(
        credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
    ) -> dict:
        payload = decode_access_token(credentials.credentials)

        if not payload:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        if payload.get("role") != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")

        return payload

    return role_checker
