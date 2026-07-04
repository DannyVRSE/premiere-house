import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About · Premiere House',
  description: 'Premiere House shapes premieres, campaigns, and press moments with cinematic precision.',
};

const SERVICES = [
  {
    name: 'Premieres',
    tag: 'The first night',
    description:
      'From red-carpet choreography to guest experience and room tone, we design opening nights that feel like the film itself — every arrival, every reveal, every applause line staged with intent.',
    points: ['Red-carpet & venue direction', 'Guest & talent experience', 'Live moment capture'],
  },
  {
    name: 'Campaigns',
    tag: 'The momentum',
    description:
      'Positioning, teaser drops, and rollout strategy that build anticipation across every market. We turn a release date into a cultural countdown audiences want to be part of.',
    points: ['Creative direction & positioning', 'Teaser & trailer sequencing', 'Global rollout planning'],
  },
  {
    name: 'Press',
    tag: 'The story',
    description:
      'Media strategy, junket production, and relationships that put your story in front of the right rooms — with messaging that stays sharp from the first headline to the final review.',
    points: ['Media & junket strategy', 'Messaging & talking points', 'Editorial relationships'],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="animate-drift absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,140,0,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44">
          <p className="animate-fade-up text-sm uppercase tracking-[0.4em] text-amber-300">The company</p>
          <h1 className="animate-fade-up mt-4 max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl [animation-delay:120ms]">
            A launch house built for <span className="text-shimmer italic">culture, not clutter.</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg [animation-delay:240ms]">
            Premiere House exists for auteurs, studios, and storytellers who want the first impression to feel
            unforgettable. We shape the atmosphere, the messaging, and the momentum behind every release — with
            calm authority and cinematic precision.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">What we do</p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Three disciplines, one seamless launch.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.name} delay={index * 140}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-amber-300/30">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{service.tag}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{service.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{service.description}</p>
                <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-zinc-300">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Our approach</p>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Every release deserves a first night that matters.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="space-y-6 text-base leading-8 text-zinc-300 sm:text-lg">
              <p>
                We work as an extension of your team — small, senior, and hands-on. No layers, no noise. Just a
                group of people who treat your launch with the same care you gave the film.
              </p>
              <p>
                Whether it&rsquo;s an intimate festival bow or a global day-and-date rollout, the goal is always
                the same: a moment audiences remember long after the credits roll.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-300"
              >
                Start a conversation →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
