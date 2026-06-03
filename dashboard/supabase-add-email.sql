-- Email-Spalte hinzufügen (für Matching bei Registrierung)
ALTER TABLE hausverwaltungen ADD COLUMN IF NOT EXISTS email TEXT;

-- Trigger updaten: verbindet User mit bestehendem HV-Eintrag falls Email passt
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Prüfe ob bereits ein Eintrag mit dieser Email existiert
  IF EXISTS (SELECT 1 FROM public.hausverwaltungen WHERE email = NEW.email) THEN
    UPDATE public.hausverwaltungen SET user_id = NEW.id WHERE email = NEW.email;
  ELSE
    -- Neuen Eintrag anlegen (Fallback)
    INSERT INTO public.hausverwaltungen (user_id, name, email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'firma', NEW.email), NEW.email);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
