"use client";

import { Card } from "@heroui/react";

import { workItems } from "./about-data";
import { AboutSectionTitle } from "./about-section-title";

export function WorkSection() {
  return (
    <section className="space-y-5">
      <AboutSectionTitle>How I work</AboutSectionTitle>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {workItems.map(([icon, title, text]) => (
          <Card className="border-white/10 bg-white/[0.04] p-6" key={title}>
            <div className="text-3xl text-violet-300">{icon}</div>
            <h3 className="mt-4 text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/54">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
