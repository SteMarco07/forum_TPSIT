-- 1. Elimina la vecchia tabella dei profili se l'avevi creata per ripulire l'ambiente
DROP TABLE IF EXISTS public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TYPE IF EXISTS user_role;

-- 2. Crea il tipo ENUM nativo di Postgres per i ruoli
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- 3. Crea la tabella minimale per memorizzare SOLO il ruolo
CREATE TABLE public.user_roles (
  -- L'ID è una chiave esterna che punta direttamente all'utente di Supabase Auth
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  -- La colonna del ruolo utilizza il nostro ENUM e va di default su 'user'
  role user_role DEFAULT 'user'::user_role NOT NULL
);

-- 4. Abilita la Row Level Security (RLS) per sicurezza
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Crea la policy: gli utenti possono leggere solo il proprio ruolo
CREATE POLICY "Gli utenti possono leggere il proprio ruolo" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = id);

-- 6. Crea la funzione e il Trigger automatico
-- Ogni volta che un utente si registra su Supabase, inserisce l'ID in questa tabella.
-- Postgres assegnerà automaticamente il ruolo 'user' grazie al DEFAULT impostato sopra.
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (id)
  VALUES (new.id);
  RETURN new;
END;
-- SECURITY DEFINER permette al trigger di bypassare temporaneamente le RLS in fase di registrazione
$$ LANGUAGE plpgsql SECURITY DEFINER; 

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();