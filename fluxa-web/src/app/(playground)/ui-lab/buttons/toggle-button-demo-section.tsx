"use client";

import { ToggleButton } from "@heroui/react";

import { NumberLabel, sectionClass } from "../showcase-frame";

export function ToggleButtonDemoSection() {
  return (
    <section className={sectionClass}>
      <NumberLabel id="B04" title="ToggleButton" />
      <div className="flex flex-wrap items-center gap-3">
        <ToggleButton defaultSelected>Preview</ToggleButton>
        <ToggleButton>Markdown</ToggleButton>
        <ToggleButton variant="ghost">Focus mode</ToggleButton>
        <ToggleButton isDisabled>Disabled</ToggleButton>
        <ToggleButton aria-label="Bold" isIconOnly>
          B
        </ToggleButton>
        <ToggleButton aria-label="Italic" isIconOnly variant="ghost">
          I
        </ToggleButton>
      </div>
    </section>
  );
}
