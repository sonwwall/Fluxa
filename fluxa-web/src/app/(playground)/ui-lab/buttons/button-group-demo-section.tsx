"use client";

import { Button, ButtonGroup } from "@heroui/react";

import { NumberLabel, sectionClass } from "../showcase-frame";

export function ButtonGroupDemoSection() {
  return (
    <section className={sectionClass}>
      <NumberLabel id="B02" title="ButtonGroup" />
      <div className="grid gap-5">
        <ButtonGroup variant="primary">
          <Button>Draft</Button>
          <Button>Review</Button>
          <Button>Publish</Button>
        </ButtonGroup>

        <ButtonGroup variant="outline">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>

        <div className="flex flex-wrap gap-5">
          <ButtonGroup orientation="vertical" variant="secondary">
            <Button>Overview</Button>
            <Button>Content</Button>
            <Button>Settings</Button>
          </ButtonGroup>

          <ButtonGroup isDisabled variant="tertiary">
            <Button>Disabled</Button>
            <Button>Group</Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
}
