/* Central API configuration + tiny contact helper. The base URL
   comes from `VITE_API_BASE_URL` (public browser-side config —
   never secrets) and falls back to the local dev server. */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, { status = null, fields = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

export async function submitContact({ name, email, message }) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
  } catch {
    throw new ApiError('Network unavailable', { status: null });
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (response.ok) return data;

  throw new ApiError(data?.error ?? 'Request failed', {
    status: response.status,
    fields: data?.fields ?? null,
  });
}
