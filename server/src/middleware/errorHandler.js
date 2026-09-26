// Central error handling: malformed JSON, unknown API routes,
// and unexpected failures all return minimal JSON. Stack traces
// and request bodies (which may contain personal data) are never
// logged or exposed.

// express.json() raises a 400 SyntaxError on malformed bodies.
export function jsonErrorHandler(err, req, res, next) {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  return next(err);
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found' });
}

// eslint-disable-next-line no-unused-vars
export function serverErrorHandler(err, req, res, next) {
  res.status(500).json({ error: 'Internal server error' });
}
