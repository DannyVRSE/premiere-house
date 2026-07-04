'use client';

import { useEffect, useState } from 'react';

function timeLeft(targetMs: number) {
  const total = Math.max(0, targetMs - Date.now());
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1_000) % 60),
  };
}

type Size = 'sm' | 'lg';

export default function Countdown({
  target,
  label = 'Premiere in',
  size = 'sm',
}: {
  target: string;
  label?: string;
  size?: Size;
}) {
  const targetMs = new Date(`${target}T00:00:00`).getTime();
  // Start null so the server and first client render match; fill in after mount.
  const [remaining, setRemaining] = useState<ReturnType<typeof timeLeft> | null>(null);

  useEffect(() => {
    setRemaining(timeLeft(targetMs));
    const id = setInterval(() => setRemaining(timeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const isLarge = size === 'lg';

  if (!remaining) {
    return <div className={isLarge ? 'h-[132px]' : 'h-[62px]'} aria-hidden />;
  }

  if (remaining.total <= 0) {
    return (
      <div
        className={`animate-pulse-glow rounded-2xl border border-amber-300/40 bg-amber-400/10 text-center font-medium uppercase tracking-[0.3em] text-amber-200 ${
          isLarge ? 'px-6 py-5 text-base' : 'px-4 py-3 text-sm'
        }`}
      >
        Now premiering
      </div>
    );
  }

  const units = [
    { value: remaining.days, label: 'Days' },
    { value: remaining.hours, label: 'Hrs' },
    { value: remaining.minutes, label: 'Min' },
    { value: remaining.seconds, label: 'Sec' },
  ];

  if (isLarge) {
    return (
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300">{label}</p>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl border border-white/10 bg-black/40 px-2 py-4 text-center shadow-lg shadow-black/30 backdrop-blur sm:px-4 sm:py-5"
            >
              <span className="block text-3xl font-semibold tabular-nums text-white sm:text-5xl">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">{label}</p>
      <div className="mt-2 grid grid-cols-4 gap-2 text-center">
        {units.map((unit) => (
          <div key={unit.label}>
            <span className="block text-xl font-semibold tabular-nums text-white">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
