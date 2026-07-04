// Central base URL for the Laravel API.
//
// Configure per environment with NEXT_PUBLIC_API_BASE (e.g. on Vercel set it to
// the Render backend URL: https://premiere-house-api.onrender.com/api).
// Falls back to the local Laravel server for development.
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api'
).replace(/\/$/, '');
