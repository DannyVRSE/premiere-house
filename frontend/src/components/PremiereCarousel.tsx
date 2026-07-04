'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

type Film = {
  id: number;
  title: string;
  tagline: string;
  poster: string;
  premiereDate: string;
  category: string;
};

const AUTO_SPEED = 0.45; // px per frame for the gentle auto-flow

function Card({ film }: { film: Film }) {
  return (
    <Link
      href={`/films/${film.id}`}
      className="group relative mr-6 block h-[440px] w-[280px] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/10 transition duration-500 hover:border-amber-300/40 sm:mr-8 sm:w-[320px]"
    >
      <img
        src={film.poster}
        alt={film.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0)_35%,rgba(8,8,8,0.55)_60%,rgba(8,8,8,0.95)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300">{film.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{film.title}</h3>

        {/* Revealed on hover for a clean resting state */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-3 text-sm leading-6 text-zinc-300">Premiere {film.premiereDate}</p>
            <span className="mt-3 inline-flex text-sm font-medium text-amber-300">Read the story →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const isLeft = direction === 'left';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? 'Previous premieres' : 'Next premieres'}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#080808]/70 text-white shadow-lg shadow-black/40 backdrop-blur transition hover:border-amber-300/50 hover:bg-white/10 hover:text-amber-300 ${
        isLeft ? 'left-3 sm:left-5' : 'right-3 sm:right-5'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isLeft ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        />
      </svg>
    </button>
  );
}

/**
 * Upcoming premieres as a continuously flowing, manually-scrollable carousel.
 * The film list is rendered twice so a mid-point wrap loops seamlessly. Auto-
 * flow runs on requestAnimationFrame; hovering, dragging, or the arrow buttons
 * pause it. Arrows and native touch/trackpad scrolling both drive scrollLeft.
 */
export default function PremiereCarousel({ films }: { films: Film[] }) {
  const loop = [...films, ...films];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const hoverRef = useRef(false); // paused while pointer is over the strip
  const manualRef = useRef(0); // remaining px to ease through from arrow clicks
  const resumeAtRef = useRef(0); // timestamp until which auto-flow stays paused
  const reducedRef = useRef(false);
  const posRef = useRef(0); // float scroll position (scrollLeft truncates subpixels)
  const lastWriteRef = useRef(0); // last value we wrote, to detect native scrolls

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const frame = (time: number) => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        // If the user scrolled natively (touch/trackpad), adopt that position.
        if (Math.abs(el.scrollLeft - lastWriteRef.current) > 1) {
          posRef.current = el.scrollLeft;
        }

        if (manualRef.current !== 0) {
          // Ease through the pending arrow-click distance.
          const eased = manualRef.current * 0.12;
          const applied = Math.abs(eased) < 0.5 ? manualRef.current : eased;
          posRef.current += applied;
          manualRef.current -= applied;
        } else if (!hoverRef.current && !reducedRef.current && time >= resumeAtRef.current) {
          posRef.current += AUTO_SPEED;
        }

        // Seamless wrap — the second copy is identical, so the jump is invisible.
        if (posRef.current >= half) posRef.current -= half;
        else if (posRef.current < 0) posRef.current += half;

        el.scrollLeft = posRef.current; // browser rounds for render; float precision kept in posRef
        lastWriteRef.current = el.scrollLeft;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Briefly hold the auto-flow while the user interacts (touch / trackpad).
  const holdAuto = () => {
    resumeAtRef.current = performance.now() + 1600;
  };

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const pitch = second.offsetLeft - first.offsetLeft; // one card + its margin
    manualRef.current += dir * pitch;
    holdAuto();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <Arrow direction="left" onClick={() => step(-1)} />

      <div
        ref={scrollerRef}
        className="edge-fade no-scrollbar scroll-auto overflow-x-auto py-2"
        onPointerDown={holdAuto}
        onWheel={holdAuto}
      >
        <div ref={trackRef} className="flex w-max">
          {loop.map((film, index) => (
            <Card key={`${film.id}-${index}`} film={film} />
          ))}
        </div>
      </div>

      <Arrow direction="right" onClick={() => step(1)} />
    </div>
  );
}
