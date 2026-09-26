import rateLimit from 'express-rate-limit';

// Abuse protection for the publicly callable contact endpoint:
// 5 POSTs per 15 minutes per IP. Normal visitors never notice it;
// bots hammering the form get a JSON 429. GETs are skipped so the
// limiter only guards the mutating behavior, and /api/health is
// never limited (monitoring must stay reachable).
// NOTE: no `trust proxy` — single-origin dev topology. Revisit only
// when a real proxy/CDN sits in front of production.

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: (req) => req.method !== 'POST',
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many contact requests. Please try again later.' });
  },
});
