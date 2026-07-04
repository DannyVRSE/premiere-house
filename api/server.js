import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const films = [
  {
    id: 1,
    title: 'The Velvet Hour',
    tagline: 'A midnight romance set against a fading city skyline.',
    releaseDate: '2026-10-14',
    premiereDate: '2026-10-12',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    synopsis: 'When a reclusive architect returns to the city that broke her heart, she is drawn into a late-night romance that rewrites her future.',
    cast: ['Mina Sol', 'Jules Armand', 'Sage Hollow'],
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Romance',
    status: 'Premiering Soon'
  },
  {
    id: 2,
    title: 'After the Static',
    tagline: 'A pulse-racing thriller told in the language of echoes.',
    releaseDate: '2026-11-03',
    premiereDate: '2026-10-29',
    poster: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
    synopsis: 'A radio host uncovers a pattern in the city’s missing transmissions and must race to stop a signal that predicts the next disappearance.',
    cast: ['Noah Vale', 'Elena Cruz', 'Rian Quill'],
    trailerUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    category: 'Thriller',
    status: 'Awaiting Premiere'
  },
  {
    id: 3,
    title: 'North of Summer',
    tagline: 'A luminous coming-of-age story about first loves and last chances.',
    releaseDate: '2027-01-18',
    premiereDate: '2027-01-15',
    poster: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    synopsis: 'Three friends cross a remote coastal town in search of a vanished lighthouse keeper and the truth behind a single summer memory.',
    cast: ['Tomi Reid', 'Ava Sloane', 'Luca Martin'],
    trailerUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    category: 'Drama',
    status: 'In Development'
  }
];

const subscribers = [];

app.get('/api/films', (_req, res) => {
  res.json(films);
});

app.get('/api/films/:id', (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  if (!film) {
    return res.status(404).json({ message: 'Film not found' });
  }
  res.json(film);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide your name, email and message.' });
  }

  subscribers.push({ name, email, message, createdAt: new Date().toISOString() });

  res.status(201).json({ message: 'Your note has been captured. We will be in touch.', success: true });
});

app.listen(port, () => {
  console.log(`Premiere House API listening on port ${port}`);
});
