import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact · Premiere House',
  description: 'Share your next release for a private briefing, or join the newsletter for premiere updates.',
};

const CHANNELS = [
  { label: 'Email', value: 'hello@premierehouse.co', href: 'mailto:hello@premierehouse.co' },
  { label: 'Press', value: 'press@premierehouse.co', href: 'mailto:press@premierehouse.co' },
  { label: 'Studio', value: 'Los Angeles · London', href: null },
];

export default function ContactPage() {
  return (
    <main className="bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="animate-drift absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,140,0,0.18),_transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-36 lg:px-8 lg:pb-20 lg:pt-44">
          <p className="animate-fade-up text-sm uppercase tracking-[0.4em] text-amber-300">Get in touch</p>
          <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-5xl font-medium tracking-tight sm:text-6xl [animation-delay:120ms]">
            Let&rsquo;s build a launch story <span className="text-shimmer italic">worth remembering.</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg [animation-delay:240ms]">
            Tell us what you&rsquo;re launching and we&rsquo;ll be in touch within two business days. Prefer a
            direct line? Reach us at any of the channels below.
          </p>

          <div className="animate-fade-up mt-10 grid gap-4 sm:grid-cols-3 [animation-delay:320ms]">
            {CHANNELS.map((channel) => (
              <div
                key={channel.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{channel.label}</p>
                {channel.href ? (
                  <a href={channel.href} className="mt-2 block text-sm text-zinc-200 transition hover:text-amber-300">
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-zinc-200">{channel.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
