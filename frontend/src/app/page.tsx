import Link from 'next/link';

async function getFilms() {
  // Fetch the list of films from the API
  const res = await fetch('http://localhost:8000/api/films', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to load films');
  }

  return res.json();
}

export default async function Home() {
  const films = await getFilms();

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <img
          src="/red-carpet-5.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.15)_0%,rgba(8,8,8,0.72)_65%,rgba(8,8,8,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,140,0,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_25%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-28">
          <nav className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-zinc-400">
            <span className="font-semibold text-white">Premiere House</span>
            <div className="flex gap-6">
              <a href="#launches" className="transition hover:text-white">Launches</a>
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </div>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Studio-adjacent launch specialists</p>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                We make every premiere feel like the first night that matters.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-zinc-300">
                Premiere House crafts cinematic launches, teaser drops, and red-carpet moments that turn a release into a cultural event.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#launches" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">
                  View upcoming releases
                </a>
                <a href="#contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Request a launch plan
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Now booking</p>
              <div className="mt-6 space-y-4 text-sm text-zinc-200">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xl font-medium text-white">Premieres • campaigns • press</p>
                  <p className="mt-2 text-zinc-300">From launch strategy to the final applause, every detail is designed with cinematic precision.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xl font-medium text-white">Global rollout support</p>
                  <p className="mt-2 text-zinc-300">Creative direction, positioning, and guest experience handled with calm authority.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="launches" className="mx-auto max-w-7xl bg-[#080808] px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Upcoming launches</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Films arriving in the spotlight</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-zinc-400">Each title is pulled from our API so the experience can grow with the slate.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {films.map((film: any) => (
            <article key={film.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur">
              <img src={film.poster} alt={film.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{film.category}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-zinc-400">{film.status}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{film.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{film.tagline}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-300">
                  <span>Premiere {film.premiereDate}</span>
                  <span>Release {film.releaseDate}</span>
                </div>
                <Link href={`/films/${film.id}`} className="inline-flex text-sm font-medium text-amber-300 transition hover:text-amber-200">
                  Read the story →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">The company</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A launch house designed for culture, not clutter.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            <p>Premiere House exists for auteurs, studios, and storytellers who want the first impression to feel unforgettable. We shape the atmosphere, the messaging, and the momentum behind every release.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Premieres','Campaigns','Press'].map((service) => (
                <div key={service} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm uppercase tracking-[0.25em] text-zinc-200">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl bg-[#080808] px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Stay in the loop</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Let’s build a launch story worth remembering.</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">Share your next release or request a private briefing. We capture every inquiry in our API so the experience stays real and reliable.</p>
            </div>
            <form action="http://localhost:8000/api/contact" method="post" className="space-y-4" target="_blank">
              <input name="name" placeholder="Name" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-0" />
              <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-0" />
              <textarea name="message" rows={4} placeholder="What are you launching?" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-0" />
              <button type="submit" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300">Submit inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
