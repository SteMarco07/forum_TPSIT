from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from supabase import create_client, Client
import os

load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI(title="Auth Service")


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.post("/api/v1/auth/register")
def register(req: RegisterRequest):
    try:
        res = supabase.auth.sign_up({"email": req.email, "password": req.password})
        user = getattr(res, "user", None)
        if not user:
            raise HTTPException(status_code=400, detail="Registration failed")
        return {"id": user.id, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/v1/auth/login")
def login(req: LoginRequest):
    try:
        auth = supabase.auth.sign_in_with_password({"email": req.email, "password": req.password})
        user = getattr(auth, "user", None)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        role_resp = supabase.table("user_roles").select("role").eq("id", user.id).single().execute()
        role = role_resp.data.get("role") if role_resp and getattr(role_resp, "data", None) else None
        token = getattr(getattr(auth, "session", None), "access_token", None)
        return {"id": user.id, "email": user.email, "role": role, "token": token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/v1/auth/test")
async def test():
    return {
        "message": "Benvenuto nell'API Forum TPSIT"
    }

