# Nautilus Dashboard – Setup in 15 Minuten

## 1. Supabase einrichten (kostenlos)

1. Gehe auf https://supabase.com → „Start your project" → kostenloses Konto anlegen
2. Neues Projekt erstellen: Name „nautilus-dashboard", Region „Frankfurt (eu-central-1)"
3. Passwort notieren, dann warten bis das Projekt bereit ist (~1 Min)
4. Links auf **SQL Editor** → Inhalt von `supabase-schema.sql` reinkopieren → **Run**
5. Unter **Project Settings → API** notieren:
   - Project URL (z.B. https://xxxxx.supabase.co)
   - anon public key

## 2. .env Datei anlegen

Im `dashboard/` Ordner eine Datei `.env` erstellen:

```
VITE_SUPABASE_URL=https://DEINE-ID.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
VITE_ADMIN_EMAIL=philipp.deboer97@yahoo.com
```

## 3. Dependencies installieren & starten

```bash
cd dashboard
npm install
npm run dev
```

→ Öffnet sich unter http://localhost:5173

## 4. Ersten Admin-User anlegen

In Supabase → **Authentication → Users → Add user**:
- Deine E-Mail: philipp.deboer97@yahoo.com
- Passwort nach Wahl
- „Auto Confirm User" aktivieren

## 5. Auf Vercel deployen (kostenlos)

1. https://vercel.com → kostenloses Konto
2. „New Project" → GitHub Repo verknüpfen oder Ordner hochladen
3. Environment Variables eintragen (wie in .env)
4. Deploy → fertig
5. Eigene Domain: In Vercel „Domains" → dashboard.nautilus-facility.de eintragen
   Dann beim Domain-Anbieter einen CNAME-Eintrag auf cname.vercel-dns.com setzen

## Tägliche Nutzung

- **Protokoll eintragen:** /admin → „Protokoll eintragen"
- **Schaden melden:** /admin → „Schaden melden" (mit Foto)
- **Neuen Kunden anlegen:** /admin → „Neue Hausverwaltung"
- **Neues Objekt:** /admin → „Neues Objekt"

Der Kunde bekommt seine Login-Daten und sieht unter /dashboard nur seine eigenen Objekte.
