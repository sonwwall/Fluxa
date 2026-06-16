"use client";

import { Card } from "@heroui/react";

import { nowItems } from "./about-data";
import { AboutSectionTitle } from "./about-section-title";

export function NowSection() {
  return (
    <section className="space-y-5">
      <AboutSectionTitle>Now</AboutSectionTitle>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {nowItems.map((item) => (
          <Card className="border-white/10 bg-white/[0.04] p-6" key={item.title}>
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)] text-xl shadow-[0_0_28px_rgba(96,165,250,0.35)]">
              {item.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 min-h-16 text-sm leading-6 text-white/58">
              {item.text}
            </p>
            <p className="mt-6 flex items-center gap-3 text-sm text-white/58">
              <span className={`h-3 w-3 rounded-full ${item.color}`} />
              {item.status}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
