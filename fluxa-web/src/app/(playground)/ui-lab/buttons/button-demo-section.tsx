"use client";

import { Button, Spinner } from "@heroui/react";

import { NumberLabel, sectionClass } from "../showcase-frame";

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
] as const;

export function ButtonDemoSection() {
  return (
    <section className={sectionClass}>
      <NumberLabel id="B01" title="Button variants" />
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button isDisabled>Disabled</Button>
          <Button>
            <Spinner aria-label="Saving" size="sm" />
            Saving
          </Button>
        </div>
      </div>
    </section>
  );
}
