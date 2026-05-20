import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def registra_utente(email: str, password: str):
    try:
        res = supabase.auth.sign_up({"email": email, "password": password})
        return res.user
    except Exception:
        return None

if __name__ == "__main__":
    email = input("Email: ").strip()
    password = input("Password: ").strip()
    print(registra_utente(email, password))