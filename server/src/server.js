import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { CLIENT_ORIGIN, PORT } from './config.js';
import healthRoutes from './routes/health.js';
import contactRoutes from './routes/contact.js';
import { contactLimiter } from './middleware/rateLimit.js';
import {
  jsonErrorHandler,
  notFoundHandler,
  serverErrorHandler,
} from './middleware/errorHandler.js';

const app = express();

// Sensible security-header defaults for a JSON API.
app.use(helmet());

// Narrow CORS: single env-driven origin (local Vite dev server).
// A validator (not a fixed string) is used on purpose: non-matching
// origins get NO Access-Control-Allow-Origin header at all.
app.use(
  cors({
    origin: (requestOrigin, callback) => {
      callback(null, requestOrigin === CLIENT_ORIGIN);
    },
  }),
);

// Small bodies only — contact payloads are plain text fields.
app.use(express.json({ limit: '10kb' }));

// Contact abuse protection (POST only; health stays unlimited).
app.use('/api/contact', contactLimiter);

app.use('/api', healthRoutes);
app.use('/api', contactRoutes);

// Malformed JSON -> 400 JSON (keeps the server running).
app.use(jsonErrorHandler);
// Unknown routes and wrong methods -> 404 JSON.
app.use(notFoundHandler);
// Unexpected failures -> 500 JSON, no stack traces.
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`Portfolio API listening on port ${PORT}`);
});
