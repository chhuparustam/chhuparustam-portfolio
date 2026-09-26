import { Resend } from 'resend';
import { CONTACT_TO_EMAIL, MAIL_FROM, RESEND_API_KEY } from './config.js';

// Module-level client: one instance for the process lifetime.
const resend = new Resend(RESEND_API_KEY);

// Minimal HTML escaping for visitor-controlled content (name,
// email, message) before it enters the HTML email body.
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Header-safe subject fragment: trimmed, single-line, bounded.
function safeSubjectName(name) {
  return name.trim().replace(/[\r\n]+/g, ' ').slice(0, 100);
}

// Sends the contact email. Throws a provider-tagged error on
// failure — the route maps it to a generic 502 without leaking
// provider internals. The plain-text body keeps original text;
// the HTML body uses escaped content only.
export async function sendContactEmail({ name, email, message }) {
  const subject = `New Portfolio Contact — ${safeSubjectName(name)}`;
  const safeEmail = escapeHtml(email);
  const text =
    `New portfolio contact request\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}\n`;
  const html =
    `<h2>New portfolio contact request</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>` +
    `<p><strong>Message:</strong></p>` +
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    const failure = new Error('Resend rejected the request');
    failure.provider = error.name ?? 'unknown';
    throw failure;
  }
}
