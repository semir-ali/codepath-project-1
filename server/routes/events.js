import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import events from '../data/events.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// API endpoint to get all events with basic info (id, slug, title, date, time, location, image, summary)
router.get('/', (req, res) => {
    const list = events.map(e => ({ id: e.id, slug: e.name || e.slug, title: e.title, date: e.date, time: e.time, location: e.location, image: e.image, summary: e.summary }));
    res.status(200).json(list);
});

router.get('/:slug', (req, res) => {
    const ev = events.find(e => e.slug === req.params.slug || e.name === req.params.slug);
    if (!ev) return res.status(404).json({ error: '404: Event not found' });
    res.status(200).json(ev);
});

export default router;