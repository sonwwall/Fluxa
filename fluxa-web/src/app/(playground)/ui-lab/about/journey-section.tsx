"use client";

import { journeyItems } from "./about-data";
import { AboutSectionTitle } from "./about-section-title";

export function JourneySection() {
  return (
    <section className="space-y-5">
      <AboutSectionTitle>Journey</AboutSectionTitle>
      <div className="relative grid gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-4 hidden border-t border-dashed border-white/20 md:block" />
        {journeyItems.map(([date, title, text]) => (
          <article className="relative text-center" key={date}>
            <div className="mx-auto h-4 w-4 rounded-full border border-violet-200 bg-[#07111f] shadow-[0_0_22px_rgba(139,92,246,0.85)]" />
            <p className="mt-5 font-medium text-violet-300">{date}</p>
            <h3 className="mt-3 text-lg font-semibold">{title}</h3>
            <p className="mx-auto mt-3 max-w-48 text-sm leading-6 text-white/54">
              {text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
