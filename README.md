# Premiere House

A premium, cinematic website for a film launch company built with a monorepo of Next.js and a lightweight Node/Express API.

## Screenshots

![Premiere House hero](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80)

![Launch cards](https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1400&q=80)

## Stack

- Next.js for the polished frontend experience
- Express API for film data and contact submissions
- Tailwind CSS for cinematic, responsive styling

Trade-off: the API is intentionally lightweight to keep the project fast to run locally while still supporting real dynamic data and persistence.

## Run locally

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. In a second terminal, start the API:
   ```bash
   cd api
   npm install
   npm run dev
   ```
3. Open http://localhost:3000 to view the site. The frontend consumes the API from http://localhost:4000.
