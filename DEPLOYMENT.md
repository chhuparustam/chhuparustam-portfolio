# DEPLOYMENT.md — production deployment preparation

Nothing here is deployed yet. This document prepares the repository
so deployment is a configuration task, not a code task. No credentials
are stored in this repo — ever.

## 1. Frontend build command

```powershell
Set-Location client
npm install
npm run build
```

Output: `client/dist/` (`index.html`, `assets/`, `favicon.svg`,
`robots.txt`, `sitemap.xml`). Serve it as a static site. No
`vercel.json` is needed: the Vite framework preset discovers the
build automatically, and hash routes (`#/project/:id`) are
client-side fragments requiring no server rewrites.

## 2. Backend start command

```powershell
Set-Location server
npm install
npm start   # node src/server.js (production)
npm run dev # nodemon src/server.js (local development only)
```

Requires Node.js `>=20.19.0` (see `engines` in both `package.json`
files; developed and tested on Node v24).

## 3. Required frontend environment variable

| Variable | Value |
| -------- | ----- |
| `VITE_API_BASE_URL` | Real deployed API origin (e.g. `https://YOUR-PRODUCTION-API.example.com`) |

Public browser-side config — it ships in the JS bundle, so it must
never hold secrets. Local default (code fallback): `http://localhost:5000`.

## 4. Required backend environment variables

| Variable | Notes |
| -------- | ----- |
| `PORT` | Supplied by most hosts automatically; `5000` fallback |
| `CLIENT_ORIGIN` | **Must be `https://chhuparustam.com.np`** in production |
| `RESEND_API_KEY` | Resend secret — hosting secret store only |
| `CONTACT_TO_EMAIL` | `chhuparustamkushwaha30@gmail.com` |
| `MAIL_FROM` | Real Resend-verified sender — no invented value exists yet |

## 5. Production frontend origin

`https://chhuparustam.com.np`

## 6. Production CORS configuration requirement

Set `CLIENT_ORIGIN=https://chhuparustam.com.np` in the backend host.
The server allows exactly that one origin (validator rejects everything
else with no header). Never use `*`. Local development keeps
`http://localhost:5173`.

## 7. Resend sender verification requirement

Production email needs a Resend-verified sender/domain in `MAIL_FROM`.
Until that exists, delivery is not fully configured — do not claim
otherwise. For a local provider test, use the sender address available
in the connected Resend account.

## 8. Resend API key requirement

Create the key in the Resend dashboard, store it as `RESEND_API_KEY`
in the backend host's secret store. It must never appear in source,
frontend bundles, logs, or Git.

## Backend deploy blueprint (Render)

`render.yaml` at the repo root declares the API service: `rootDir:
server`, `npm install` → `npm start`, health check `/api/health`,
public vars (`CLIENT_ORIGIN`, `CONTACT_TO_EMAIL`) pre-filled, secrets
(`RESEND_API_KEY`, `MAIL_FROM`) as dashboard-prompted values. To use
it: create a Render Web Service from the repository, confirm the
blueprint values, fill the two secrets, deploy — then record the real
service URL and continue with frontend configuration. `PORT` is left
to the platform (the server reads `process.env.PORT` with a fallback).

## 9. Custom domain setup reminder

Point `chhuparustam.com.np` at the frontend host. Canonical, sitemap,
robots, and OpenGraph already use exactly this domain — do not change
them to a hosting-provider temporary URL.

## 10. Post-deployment health check

```text
GET /api/health → 200 { "status": "ok" }
```

## 11. Contact form verification

Submit a real request through the deployed site, confirm the `200`
response, the "Your contact request was received." state, and the
email in the inbox. Then verify a bad request still returns `400`
with field errors.

## 12. Secret-handling warning

`.env` files are git-ignored in both `client/` and `server/` and must
never be committed. `VITE_*` values are public by design — secrets
belong only in the backend host's environment. If a secret ever leaks
into Git or a bundle, rotate it immediately in the provider dashboard.

## Manual steps after deployment (not yet performed)

- Set all five backend variables in the host; set `VITE_API_BASE_URL`
  in the frontend host; set `CLIENT_ORIGIN` to the production domain.
- Run the health check (§10) and the real contact verification (§11).
- If the host terminates TLS at a proxy/CDN, review `trust proxy`
  (currently off) and confirm the rate limiter still keys clients
  correctly.
