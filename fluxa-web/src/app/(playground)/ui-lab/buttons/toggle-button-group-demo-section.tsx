"use client";

import { ToggleButton, ToggleButtonGroup } from "@heroui/react";

import { NumberLabel, sectionClass } from "../showcase-frame";

export function ToggleButtonGroupDemoSection() {
  return (
    <section className={sectionClass}>
      <NumberLabel id="B05" title="ToggleButtonGroup" />
      <div className="grid gap-5">
        <ToggleButtonGroup
          aria-label="Editor formatting"
          defaultSelectedKeys={["bold"]}
          selectionMode="multiple"
        >
          <ToggleButton id="bold">Bold</ToggleButton>
          <ToggleButton id="italic">Italic</ToggleButton>
          <ToggleButton id="code">Code</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          aria-label="Article view density"
          defaultSelectedKeys={["comfortable"]}
          isDetached
          selectionMode="single"
        >
          <ToggleButton id="compact">Compact</ToggleButton>
          <ToggleButton id="comfortable">Comfortable</ToggleButton>
          <ToggleButton id="wide">Wide</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </section>
  );
}
