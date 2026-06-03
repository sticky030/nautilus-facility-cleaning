-- ============================================================
-- Nautilus Facility Cleaning – Supabase Schema (vollständig)
-- Einmal ausführen unter: Supabase → SQL Editor → Run
-- ============================================================

-- 1. Tabellen anlegen
CREATE TABLE IF NOT EXISTS hausverwaltungen (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS objekte (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hausverwaltung_id UUID REFERENCES hausverwaltungen(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  adresse           TEXT,
  status            TEXT DEFAULT 'ok' CHECK (status IN ('ok','hinweis','dringend')),
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS protokolle (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objekt_id   UUID REFERENCES objekte(id) ON DELETE CASCADE,
  datum       DATE NOT NULL,
  mitarbeiter TEXT,
  notizen     TEXT,
  pdf_url     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schadensmeldungen (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objekt_id    UUID REFERENCES objekte(id) ON DELETE CASCADE,
  titel        TEXT NOT NULL,
  beschreibung TEXT,
  foto_url     TEXT,
  behoben      BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fotos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objekt_id    UUID REFERENCES objekte(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  beschreibung TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RLS aktivieren
-- ============================================================
ALTER TABLE hausverwaltungen  ENABLE ROW LEVEL SECURITY;
ALTER TABLE objekte            ENABLE ROW LEVEL SECURITY;
ALTER TABLE protokolle         ENABLE ROW LEVEL SECURITY;
ALTER TABLE schadensmeldungen  ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos              ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Alte Policies löschen
-- ============================================================
DROP POLICY IF EXISTS "hv_own"             ON hausverwaltungen;
DROP POLICY IF EXISTS "obj_own"            ON objekte;
DROP POLICY IF EXISTS "proto_own"          ON protokolle;
DROP POLICY IF EXISTS "schaden_own"        ON schadensmeldungen;
DROP POLICY IF EXISTS "fotos_own"          ON fotos;
DROP POLICY IF EXISTS "admin_full_hv"      ON hausverwaltungen;
DROP POLICY IF EXISTS "admin_full_obj"     ON objekte;
DROP POLICY IF EXISTS "admin_full_proto"   ON protokolle;
DROP POLICY IF EXISTS "admin_full_schaden" ON schadensmeldungen;
DROP POLICY IF EXISTS "admin_full_fotos"   ON fotos;

-- ============================================================
-- Kunden-Policies (nur eigene Daten sichtbar)
-- ============================================================
CREATE POLICY "hv_own" ON hausverwaltungen
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "obj_own" ON objekte
  FOR SELECT USING (
    hausverwaltung_id IN (
      SELECT id FROM hausverwaltungen WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "proto_own" ON protokolle
  FOR SELECT USING (
    objekt_id IN (
      SELECT o.id FROM objekte o
      JOIN hausverwaltungen h ON o.hausverwaltung_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

CREATE POLICY "schaden_own" ON schadensmeldungen
  FOR SELECT USING (
    objekt_id IN (
      SELECT o.id FROM objekte o
      JOIN hausverwaltungen h ON o.hausverwaltung_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

CREATE POLICY "fotos_own" ON fotos
  FOR SELECT USING (
    objekt_id IN (
      SELECT o.id FROM objekte o
      JOIN hausverwaltungen h ON o.hausverwaltung_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

-- ============================================================
-- Admin-Policies (voller Zugriff)
-- ============================================================
CREATE POLICY "admin_full_hv" ON hausverwaltungen
  FOR ALL USING (auth.jwt() ->> 'email' = 'philipp.deboer97@yahoo.com');

CREATE POLICY "admin_full_obj" ON objekte
  FOR ALL USING (auth.jwt() ->> 'email' = 'philipp.deboer97@yahoo.com');

CREATE POLICY "admin_full_proto" ON protokolle
  FOR ALL USING (auth.jwt() ->> 'email' = 'philipp.deboer97@yahoo.com');

CREATE POLICY "admin_full_schaden" ON schadensmeldungen
  FOR ALL USING (auth.jwt() ->> 'email' = 'philipp.deboer97@yahoo.com');

CREATE POLICY "admin_full_fotos" ON fotos
  FOR ALL USING (auth.jwt() ->> 'email' = 'philipp.deboer97@yahoo.com');

-- ============================================================
-- Trigger: Hausverwaltung automatisch bei neuem User anlegen
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.hausverwaltungen (user_id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'firma', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Storage Bucket für Fotos + PDFs
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos', 'fotos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "fotos_public_read" ON storage.objects;
DROP POLICY IF EXISTS "fotos_admin_write" ON storage.objects;

CREATE POLICY "fotos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'fotos');

CREATE POLICY "fotos_admin_write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'fotos');
