"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    initials: "PS",
    name: "Priya Sundaram",
    area: "Palayamkottai",
    date: "May 2025",
    rating: 5,
    text: "Booked at 10 AM, technician arrived by noon and fixed the door lock. Very professional and the pricing was transparent from the start.",
    color: "bg-blue-600",
  },
  {
    initials: "KR",
    name: "Karthik Raja",
    area: "Thoothukudi",
    date: "Apr 2025",
    rating: 5,
    text: "PCB on my LG machine was dead. They diagnosed it, ordered the genuine part and fixed it in 2 days. Saved me from buying a new machine.",
    color: "bg-violet-600",
  },
  {
    initials: "AM",
    name: "Anitha Murugan",
    area: "Tuticorin",
    date: "Apr 2025",
    rating: 5,
    text: "Excellent deep cleaning. The technician explained everything, removed all the bad smell and even cleaned the gasket. Worth every rupee.",
    color: "bg-emerald-600",
  },
  {
    initials: "VK",
    name: "Vignesh Kumar",
    area: "Ettayapuram",
    date: "Mar 2025",
    rating: 5,
    text: "Same-day Samsung repair, genuine spare part, 90-day warranty. KG Home Care is now our go-to service for anything washing machine.",
    color: "bg-rose-600",
  },
  {
    initials: "MS",
    name: "Meena Selvam",
    area: "Palayamkottai",
    date: "Mar 2025",
    rating: 5,
    text: "Quick response within the hour. Technician fixed the water leakage on the spot and explained what caused it. Highly recommend.",
    color: "bg-orange-500",
  },
  {
    initials: "SB",
    name: "Suresh Babu",
    area: "Kovilpatti",
    date: "Feb 2025",
    rating: 5,
    text: "Annual maintenance done perfectly. Cleaned thoroughly, replaced the worn belt. Machine runs like new. Will book every year.",
    color: "bg-teal-600",
  },
];

function useVisible() {
  const [visible, setVisible] = useState(2);
  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 640 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const visible = useVisible();
  const maxIdx = Math.max(0, REVIEWS.length - visible);

  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxIdx : c - 1)), [maxIdx]);
  const next = useCallback(() => setCurrent((c) => (c >= maxIdx ? 0 : c + 1)), [maxIdx]);

  useEffect(() => { setCurrent((c) => Math.min(c, maxIdx)); }, [maxIdx]);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  const GAP = 20;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(-${current} * (100% / ${visible} + ${GAP / visible}px)))`,
          }}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="shrink-0 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.07)]"
              style={{ width: `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
            >
              {/* header */}
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-bold text-white ${r.color}`}>
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.area} · {r.date}</p>
                </div>
              </div>

              {/* stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* quote */}
              <p className="flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* verified badge */}
              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs font-semibold text-green-700">Verified Google review</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={prev} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-[#185FA5]/40 hover:text-[#185FA5]">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={["rounded-full transition-all duration-300", i === current ? "h-2.5 w-6 bg-[#185FA5]" : "h-2.5 w-2.5 bg-slate-200 hover:bg-[#185FA5]/40"].join(" ")}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-[#185FA5]/40 hover:text-[#185FA5]">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
