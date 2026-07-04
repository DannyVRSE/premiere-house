import Link from 'next/link';

async function getFilm(id: string) {
  const res = await fetch(`http://localhost:4000/api/films/${id}`, {
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_40%),linear-gradient(135deg,#080808_0%,#160d0f_45%,#0b0b0b_100%)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:px-8">
        <Link href="/" className="text-sm uppercase tracking-[0.3em] text-zinc-400 transition hover:text-white">
          ← Back to Premiere House
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">{film.category}</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{film.title}</h1>
            <p className="max-w-2xl text-lg text-zinc-300">{film.tagline}</p>
            <p className="text-base leading-8 text-zinc-300">{film.synopsis}</p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Premiere {film.premiereDate}</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Release {film.releaseDate}</div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-black/50 backdrop-blur">
            <img src={film.poster} alt={film.title} className="h-96 w-full rounded-2xl object-cover" />
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Cast</p>
                <p className="mt-2 text-sm text-zinc-200">{film.cast.join(' • ')}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Trailer</p>
                <a href={film.trailerUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-amber-300 transition hover:text-amber-200">
                  Watch the official preview
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
