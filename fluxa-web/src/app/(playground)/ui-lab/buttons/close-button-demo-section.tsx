"use client";

import { CloseButton } from "@heroui/react";

import { NumberLabel, sectionClass } from "../showcase-frame";

export function CloseButtonDemoSection() {
  return (
    <section className={sectionClass}>
      <NumberLabel id="B03" title="CloseButton" />
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-4">
          <span className="text-sm text-black/60">Modal header</span>
          <CloseButton aria-label="Close modal" />
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#171717] p-4 text-white">
          <span className="text-sm text-white/70">Dark surface</span>
          <CloseButton aria-label="Close dark surface" />
        </div>

        <CloseButton aria-label="Standalone close" />
      </div>
    </section>
  );
}
