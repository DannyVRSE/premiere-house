import Link from 'next/link';
import Countdown from '@/components/Countdown';
import Reveal from '@/components/Reveal';
import { API_BASE } from '@/lib/api';

async function getFilm(id: string) {
  const res = await fetch(`${API_BASE}/films/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load film');
  }

  return res.json();
}

export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const film = await getFilm(id);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* Cinematic backdrop from the poster */}
      <img
        src={film.poster}
        alt=""
        aria-hidden
        className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,8,0.92)_0%,rgba(22,13,15,0.88)_45%,rgba(11,11,11,0.96)_100%)]" />
      <div className="animate-drift absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,140,0,0.16),_transparent_45%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-28 lg:px-8 lg:pt-32">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.3em] text-zinc-400 transition hover:text-white"
        >
          ← Back to Premiere House
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6 animate-fade-up">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">{film.category}</p>
            <h1 className="font-display text-5xl font-medium tracking-tight sm:text-6xl">{film.title}</h1>
            <p className="max-w-2xl text-lg text-zinc-300">{film.tagline}</p>

            {/* Countdown to the premiere */}
            <div className="max-w-lg rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <Countdown target={film.premiereDate} label="Premiere begins in" size="lg" />
            </div>

            <p className="text-base leading-8 text-zinc-300">{film.synopsis}</p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                Premiere {film.premiereDate}
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                Release {film.releaseDate}
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{film.status}</div>
            </div>
          </div>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/50 backdrop-blur">
              <img src={film.poster} alt={film.title} className="h-96 w-full rounded-2xl object-cover" />
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Cast</p>
                  <p className="mt-2 text-sm text-zinc-200">{film.cast.join(' • ')}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Trailer</p>
                  <a
                    href={film.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm text-amber-300 transition hover:text-amber-200"
                  >
                    Watch the official preview →
                  </a>
                </div>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex w-full justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Enquire about this premiere
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
