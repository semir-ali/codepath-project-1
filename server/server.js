import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve client src (index, css, 404) and public scripts directory
app.use('/scripts', express.static(path.join(__dirname, '..', 'client', 'public', 'scripts')));
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'public', 'images')));
app.use(express.static(path.join(__dirname, '..', 'client', 'src')));
// Serve all public assets (images, logo, etc.) from /assets
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'public')));

// API routes
app.use('/api/events', api);

// Dynamic event detail pages (unique endpoints)
app.get('/events/:slug', (req, res) => {
  // Serve the client-side event template; client script will fetch event data.
  res.sendFile(path.join(__dirname, '..', 'client', 'src', 'event.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));