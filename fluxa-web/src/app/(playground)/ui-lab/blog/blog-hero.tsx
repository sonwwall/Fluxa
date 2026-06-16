"use client";

import { Button, Chip } from "@heroui/react";

import { topics } from "./blog-data";

export function BlogHero() {
  return (
    <section className="grid min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(11,18,35,0.96),rgba(6,9,19,0.98))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.38)] lg:grid-cols-[1fr_360px] lg:p-8">
      <div className="flex flex-col justify-center gap-6">
        <Chip className="w-fit bg-white/[0.06] text-sky-200">
          Thoughts, experiments, and shipping in public.
        </Chip>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Modern notes on{" "}
            <span className="bg-[linear-gradient(90deg,#65e9ff,#5e8cff,#a883ff)] bg-clip-text text-transparent">
              code, systems,
            </span>{" "}
            and building
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/62">
            A personal space for sharing ideas, deep dives, and practical
            lessons from building products and exploring technology.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="shadow-[0_0_28px_rgba(68,150,255,0.45)]" variant="primary">
            Read latest
          </Button>
          <Button variant="secondary">Explore projects</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Chip className="bg-white/[0.045] text-white/70" key={topic}>
              {topic}
            </Chip>
          ))}
        </div>
      </div>

      <div className="relative hidden items-center justify-center lg:flex">
        <div className="absolute h-64 w-64 rounded-full bg-sky-400/12 blur-3xl" />
        <div className="relative h-64 w-64">
          <div className="absolute left-12 top-16 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-sky-300/30 bg-sky-400/15 shadow-[0_0_50px_rgba(56,189,248,0.35)]" />
          <div className="absolute left-20 top-24 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-violet-300/30 bg-violet-500/25 shadow-[0_0_50px_rgba(124,77,255,0.35)]" />
          <div className="absolute left-8 top-32 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-blue-300/30 bg-blue-500/20" />
        </div>
      </div>
    </section>
  );
}
