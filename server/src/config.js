// Environment configuration with safe startup validation.
// Delivery settings are REQUIRED: without them the API refuses to
// start rather than pretend contact delivery works. Errors name the
// missing variable only — secret values are never printed.

function required(name) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') {
    console.error(`Missing ${name}: email delivery is not configured.`);
    process.exit(1);
  }
  return raw;
}

function requiredEmail(name) {
  const raw = required(name);
  const address = raw.includes('<')
    ? (raw.match(/<([^<>]*)>/) ?? [])[1] ?? ''
    : raw;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim())) {
    console.error(`Invalid ${name}: expected an email address.`);
    process.exit(1);
  }
  return raw.trim();
}

function resolvePort() {
  const raw = process.env.PORT;
  if (raw === undefined || raw === '') return 5000;
  const port = Number.parseInt(raw, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Invalid PORT: expected an integer between 1 and 65535.');
    process.exit(1);
  }
  return port;
}

function resolveClientOrigin() {
  const raw = process.env.CLIENT_ORIGIN;
  if (raw === undefined || raw === '') return 'http://localhost:5173';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('unsupported protocol');
    }
    return url.origin;
  } catch {
    console.error('Invalid CLIENT_ORIGIN: expected an http(s) origin URL.');
    process.exit(1);
  }
}

export const PORT = resolvePort();
export const CLIENT_ORIGIN = resolveClientOrigin();
export const RESEND_API_KEY = required('RESEND_API_KEY');
export const CONTACT_TO_EMAIL = requiredEmail('CONTACT_TO_EMAIL');
export const MAIL_FROM = requiredEmail('MAIL_FROM');
