"use client";

import { Button, Card } from "@heroui/react";

export function AboutCta() {
  return (
    <section className="pb-6">
      <Card className="overflow-hidden border-sky-300/20 bg-white/[0.045]">
        <div className="relative grid gap-6 p-8 lg:grid-cols-[1fr_300px] lg:items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_65%,rgba(139,92,246,0.32),transparent_36%),radial-gradient(circle_at_42%_30%,rgba(56,189,248,0.16),transparent_32%)]" />
          <div className="relative">
            <h2 className="text-3xl font-semibold">Let&apos;s build something useful.</h2>
            <p className="mt-3 text-white/62">
              I&apos;m open to internship opportunities and exciting projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary">Email me</Button>
              <Button variant="secondary">GitHub</Button>
              <Button variant="outline">Resume</Button>
            </div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="flex items-center gap-3 font-medium">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              Available for Internship
            </p>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Actively looking for backend / Go internship opportunities.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
