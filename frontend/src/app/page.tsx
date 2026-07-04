import Link from 'next/link';
import ContactSection from '@/components/ContactSection';
import FeaturedLaunch from '@/components/FeaturedLaunch';
import PremiereCarousel from '@/components/PremiereCarousel';
import Reveal from '@/components/Reveal';
import { API_BASE } from '@/lib/api';

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

async function getFilms(): Promise<Film[]> {
  // Fetch the list of films from the API
  const res = await fetch(`${API_BASE}/films`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to load films');
  }

  return res.json();
}

// The soonest upcoming premiere becomes the highlighted launch.
function pickFeatured(films: Film[]): Film {
  const now = Date.now();
  const upcoming = [...films]
    .filter((f) => new Date(`${f.premiereDate}T00:00:00`).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(`${a.premiereDate}T00:00:00`).getTime() -
        new Date(`${b.premiereDate}T00:00:00`).getTime(),
    );
  return upcoming[0] ?? films[0];
}

export default async function Home() {
  const films = await getFilms();
  const featured = pickFeatured(films);

  return (
    <main className="bg-[#080808] text-white">
      {/* ---- Hero ---- */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src="/red-carpet-5.jpg"
          alt=""
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.35)_0%,rgba(8,8,8,0.7)_55%,rgba(8,8,8,0.95)_85%,#080808_100%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
          <div className="max-w-3xl animate-fade-up space-y-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Launch specialists for film &amp; culture
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Every premiere, the{' '}
              <span className="text-shimmer italic">first night that matters.</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
              Cinematic launches, teaser drops, and red-carpet moments that turn a release into a cultural event.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#launches"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300"
              >
                View upcoming releases
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Request a launch plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Highlighted launch ---- */}
      <FeaturedLaunch film={featured} />

      {/* ---- Launch slate (auto-flowing carousel) ---- */}
      <section id="launches" className="bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Upcoming launches</p>
                <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">The slate</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-zinc-500">
                A living slate of premieres. Hover to pause — tap any title for the full story.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <PremiereCarousel films={films} />
        </div>
      </section>

      {/* ---- About teaser ---- */}
      <section className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">The company</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              A launch house designed for culture, not clutter.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Premieres, campaigns, and press — shaped with calm authority for storytellers who want the first
              impression to feel unforgettable.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              About our services →
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
