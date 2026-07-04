import Link from 'next/link';
import Countdown from '@/components/Countdown';

type Film = {
  id: number;
  title: string;
  tagline: string;
  poster: string;
  premiereDate: string;
  releaseDate: string;
  category: string;
  status: string;
};

/**
 * The hero "next up" launch — a large, cinematic countdown to the soonest
 * premiere on the slate.
 */
export default function FeaturedLaunch({ film }: { film: Film }) {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop poster with slow zoom */}
      <img
        src={film.poster}
        alt=""
        aria-hidden
        className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#080808_0%,rgba(8,8,8,0.82)_28%,rgba(8,8,8,0.72)_55%,rgba(8,8,8,0.96)_100%)]" />
      <div className="animate-drift absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,140,0,0.25),_transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-amber-400" />
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Next premiere</p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">{film.category}</p>
            <h2 className="mt-3 font-display text-5xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
              {film.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">{film.tagline}</p>
            <div className="mt-8 max-w-lg">
              <Countdown target={film.premiereDate} label="Premiere begins in" size="lg" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/films/${film.id}`}
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300"
              >
                Explore the premiere
              </Link>
              <a
                href="#launches"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                See the full slate
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="animate-float overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
              <img src={film.poster} alt={film.title} className="h-[420px] w-full object-cover sm:h-[520px]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{film.status}</p>
                <p className="mt-1 text-sm text-zinc-200">Premiere {film.premiereDate} · Release {film.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
