'use client';

import { useEffect, useState } from 'react';
import { API_BASE } from '@/lib/api';

type Popup = { tone: 'success' | 'error'; title: string; message: string };

export default function ContactSection() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterPending, setNewsletterPending] = useState(false);
  const [inquiryPending, setInquiryPending] = useState(false);

  function notify(tone: Popup['tone'], title: string, message: string) {
    setPopup({ tone, title, message });
  }

  // Let the Escape key dismiss the popup.
  useEffect(() => {
    if (!popup) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setPopup(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [popup]);

  async function handleNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newsletterPending) return;

    setNewsletterPending(true);
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        notify('success', "You're on the list", data.message ?? "Front-row premiere updates are on their way.");
        setNewsletterEmail('');
      } else {
        notify('error', 'Check your email', data.message ?? data.errors?.email?.[0] ?? 'Please enter a valid email address.');
      }
    } catch {
      notify('error', 'Something went wrong', 'We could not reach the studio. Please try again.');
    } finally {
      setNewsletterPending(false);
    }
  }

  async function handleInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inquiryPending) return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setInquiryPending(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        notify('success', 'Inquiry received', data.message ?? 'Your note has been captured. We will be in touch shortly.');
        form.reset();
      } else {
        const firstError = data.errors ? (Object.values(data.errors)[0] as string[])?.[0] : undefined;
        notify('error', 'Almost there', data.message ?? firstError ?? 'Please check the form and try again.');
      }
    } catch {
      notify('error', 'Something went wrong', 'We could not reach the studio. Please try again.');
    } finally {
      setInquiryPending(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl bg-[#080808] px-6 py-20 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Stay in the loop</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Let&rsquo;s build a launch story worth remembering.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">
              Join the newsletter for front-row premiere updates, or share your next release for a private briefing.
              We read every note personally and reply within two business days.
            </p>

            <form onSubmit={handleNewsletter} className="mt-8 space-y-3">
              <label htmlFor="newsletter-email" className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
                Newsletter
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="you@studio.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-amber-300/60"
                />
                <button
                  type="submit"
                  disabled={newsletterPending}
                  className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {newsletterPending ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>

          <form id="book" onSubmit={handleInquiry} className="scroll-mt-28 space-y-4">
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-amber-300/60"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-amber-300/60"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="What are you launching?"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-amber-300/60"
            />
            <button
              type="submit"
              disabled={inquiryPending}
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {inquiryPending ? 'Sending…' : 'Submit inquiry'}
            </button>
          </form>
        </div>
      </div>

      {/* Popup notification */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setPopup(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#111] p-8 text-center shadow-2xl shadow-black/50">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
                popup.tone === 'success'
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-red-500/15 text-red-300'
              }`}
            >
              {popup.tone === 'success' ? '✓' : '!'}
            </div>
            <h3 id="popup-title" className="mt-5 text-xl font-semibold text-white">
              {popup.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{popup.message}</p>
            <button
              type="button"
              onClick={() => setPopup(null)}
              className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
