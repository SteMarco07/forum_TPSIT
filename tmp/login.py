import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def login_utente(email: str, password: str):
    try:
        auth = supabase.auth.sign_in_with_password({"email": email, "password": password})
        user = getattr(auth, "user", None)
        if not user:
            return None
        role_resp = supabase.table("user_roles").select("role").eq("id", user.id).single().execute()
        role = role_resp.data.get("role") if role_resp and role_resp.data else None
        return {"id": user.id, "email": user.email, "ruolo": role, "token": getattr(auth.session, "access_token", None)}
    except Exception:
        return None

if __name__ == "__main__":
    email = input("Email: ").strip()
    password = input("Password: ").strip()
    print(login_utente(email, password))