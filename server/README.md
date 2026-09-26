# Portfolio API (`server/`)

Minimal Express backend for `chhuparustam.com.np`. Health check plus a
contact endpoint that **validates, then delivers one email via Resend**.

## Purpose

- `GET /api/health` — liveness probe.
- `POST /api/contact` — validates `{ name, email, message }`, sends one
  email to the site owner through Resend, then acknowledges receipt.
  **No database**: nothing is stored. Contact content and visitor PII
  are never logged.

## Installation

```powershell
Set-Location server
npm install
```

## Environment variables

| Variable | Default | Description |
| -------- | ------- | ---------------------- |
| `PORT`   | `5000`  | Port the API listens on (integer 1–65535, else startup fails) |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Single allowed CORS origin (http(s) URL, else startup fails) |
| `RESEND_API_KEY` | *(required)* | Resend secret — server environment only, never the browser |
| `CONTACT_TO_EMAIL` | *(required)* | Destination inbox (email address) |
| `MAIL_FROM` | *(required)* | Verified Resend sender, e.g. `Portfolio <hello@verified-domain>` |

Copy `.env.example` for reference. Do not commit a real `.env`
(see `.gitignore`). No dotenv loader is installed on purpose — set
variables in the environment (e.g. `$env:PORT=5000`) or rely on the
fallbacks. After deployment, set `CLIENT_ORIGIN` to the actual
deployed frontend origin — never invent one before that happens.

## Start / dev

```powershell
npm start   # node src/server.js
npm run dev # nodemon src/server.js (dev only)
```

## Endpoints

### `GET /api/health`

Response `200`:

```json
{ "status": "ok" }
```

### `POST /api/contact`

Request:

```json
{ "name": "Chhuparustam Kumar Kushwaha", "email": "chhuparustamkushwaha30@gmail.com", "message": "Hello" }
```

- `200` — `{ "success": true, "message": "Contact request received." }`
  (only after Resend accepts the email)
- `400` — `{ "error": "Validation failed", "fields": { "name": "Name is required" } }`
- `429` — `{ "error": "Too many contact requests. Please try again later." }`
- `502` — `{ "error": "Unable to deliver the contact request right now." }`
  (Resend reported an error; nothing provider-specific is exposed)
- Malformed JSON — `400` `{ "error": "Invalid JSON" }`
- Unknown route — `404` `{ "error": "Not found" }`
- Unexpected failure — `500` `{ "error": "Internal server error" }`

Bodies are limited to `10kb`. Field limits: name 100, email 254,
message 2000 characters (after trimming).

## Abuse protection

- `POST /api/contact` — 5 requests per 15 minutes per IP (`429` JSON
  above; standard `RateLimit-*` headers included). Only POSTs count.
- `GET /api/health` is never limited so monitoring stays reachable.

## Security headers

`helmet()` defaults on every response. No `trust proxy` — the current
topology is a single local origin with no proxy/CDN in front; revisit
only when production puts one there.

## CORS decision

Minimal `cors` middleware allows exactly one origin: the local Vite
dev server (`CLIENT_ORIGIN`, default `http://localhost:5173`) so the
browser contact form can POST during development. No wildcard, no
production origins — the backend is undeployed, so none are added yet.

## Email delivery (Resend)

Flow: parse JSON → validate → rate limit → `resend.emails.send` →
`200` only on provider acceptance.

- `from`: `MAIL_FROM` (must be a Resend-verified sender/domain).
  The visitor's address is never used as `from`.
- `to`: `CONTACT_TO_EMAIL`.
- `replyTo`: the visitor's validated email (reply directly to them).
- Subject: `New Portfolio Contact — <name>` (trimmed, single-line).
- Body: plain text plus an HTML version with escaped visitor content.
- No idempotency keys, no retries, no persistence — one send attempt
  per valid request.

## Sender verification requirement

Production sending needs a Resend-verified sender/domain in
`MAIL_FROM`. Until that exists, delivery is not fully configured —
for a local provider test, use the sender address available in the
connected Resend account. Do not invent a production sender.

## Limitation

This API delivers one email per valid request and persists nothing.
Database integration is a later phase decision.
