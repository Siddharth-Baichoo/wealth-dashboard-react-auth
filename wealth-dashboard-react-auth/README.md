# Wealth Dashboard (with Keycloak Login)

Next.js app with Tailwind + SWR + Recharts and **OIDC login** via Keycloak (PKCE).

## Quickstart

### 1) Start Keycloak (with fintech realm)
```bash
unzip keycloak-fintech-realm.zip
cd keycloak
docker compose up -d
# Admin: http://localhost:8070  (admin / admin)
```
Imported realm: **fintech**, client: **wealth-dashboard**, user: **demo/demo1234**.

### 2) Configure the app
Copy `.env.local.example` → `.env.local` (defaults already point to the local Keycloak and callback):
```env
OIDC_ISSUER=http://localhost:8070/realms/fintech
OIDC_CLIENT_ID=wealth-dashboard
OIDC_REDIRECT_URI=http://localhost:3000/api/auth/callback
OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
```

### 3) Run the app
```bash
corepack enable
corepack prepare pnpm@9 --activate
pnpm install
pnpm dev
```
Open http://localhost:3000 and click **Login** (top-right). After authenticating, your name appears and a **Logout** button shows.

### Notes
- Dev calls to `/api/*` are proxied to `http://localhost:8080/api/*` (see `next.config.mjs`).
- Tokens are stored in **httpOnly cookies** for local dev. In production, use `secure: true`, shorter lifetimes, and a proper session store.
- This is a minimal OIDC example—good for demos. For production, consider a battle-tested library (e.g. next-auth) and CSRF/nonce hardening.
