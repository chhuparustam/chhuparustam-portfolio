import { Router } from 'express';
import { sendContactEmail } from '../email.js';

const router = Router();

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  message: 2000,
};

// Reasonable format check only — the server validates independently
// and never trusts client-side validation.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkField(value, max, format) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (trimmed === '') return 'required';
  if (trimmed.length > max) return 'too-long';
  if (format === 'email' && !EMAIL_PATTERN.test(trimmed)) return 'invalid';
  return null;
}

const MESSAGES = {
  name: {
    required: 'Name is required',
    'too-long': 'Name must be 100 characters or fewer',
  },
  email: {
    required: 'Email is required',
    'too-long': 'Email must be 254 characters or fewer',
    invalid: 'Email must be a valid email address',
  },
  message: {
    required: 'Message is required',
    'too-long': 'Message must be 2000 characters or fewer',
  },
};

// POST /api/contact — validate, then deliver through Resend, then
// acknowledge. Success is returned ONLY after the provider accepts
// the email. Nothing is stored anywhere; no contact content or PII
// is ever logged (see README).
router.post('/contact', async (req, res) => {
  const body = req.body ?? {};
  const fields = {};
  const clean = {};

  for (const key of ['name', 'email', 'message']) {
    const problem = checkField(
      body[key],
      MAX_LENGTHS[key],
      key === 'email' ? 'email' : null,
    );
    if (problem) {
      fields[key] = MESSAGES[key][problem];
    } else {
      clean[key] = body[key].trim();
    }
  }

  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: 'Validation failed', fields });
  }

  try {
    await sendContactEmail(clean);
  } catch (error) {
    console.error(`Contact delivery failed (${error?.provider ?? 'unknown'})`);
    return res.status(502).json({ error: 'Unable to deliver the contact request right now.' });
  }

  return res.status(200).json({ success: true, message: 'Contact request received.' });
});

export default router;
