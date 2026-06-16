"use client";

import { Button, Card, Chip } from "@heroui/react";

export function FeaturedArticle() {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.035] shadow-[0_20px_70px_rgba(0,0,0,0.34)]">
      <div className="grid md:grid-cols-[42%_1fr]">
        <div className="relative min-h-56 overflow-hidden bg-[#07111f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(82,196,255,0.32),transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.65))]" />
          <div className="absolute left-1/2 top-1/2 h-20 w-12 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sky-200/50 bg-sky-300/10 shadow-[0_0_45px_rgba(56,189,248,0.65)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[radial-gradient(ellipse_at_center,rgba(65,160,255,0.32),transparent_65%)]" />
        </div>
        <div className="flex flex-col justify-between p-5">
          <Card.Header className="p-0">
            <Chip className="mb-4 w-fit bg-sky-400/15 text-sky-200">Featured</Chip>
            <Card.Title className="text-2xl leading-snug text-white">
              Designing Resilient Systems: Patterns That Scale
            </Card.Title>
            <Card.Description className="mt-3 max-w-xl text-sm leading-6 text-white/58">
              A deep dive into proven architectural patterns that help systems
              stay reliable, observable, and evolvable as they grow.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="mt-6 flex items-center justify-between p-0 text-sm text-white/45">
            <span>May 12, 2024 · 12 min read</span>
            <Button size="sm" variant="secondary">
              Read article
            </Button>
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
}
