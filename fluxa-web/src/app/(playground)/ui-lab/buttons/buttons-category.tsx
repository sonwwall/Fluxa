"use client";

import { ButtonDemoSection } from "./button-demo-section";
import { ButtonGroupDemoSection } from "./button-group-demo-section";
import { CloseButtonDemoSection } from "./close-button-demo-section";
import { ToggleButtonDemoSection } from "./toggle-button-demo-section";
import { ToggleButtonGroupDemoSection } from "./toggle-button-group-demo-section";

export function ButtonsCategory() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ButtonDemoSection />
      <ButtonGroupDemoSection />
      <CloseButtonDemoSection />
      <ToggleButtonDemoSection />
      <ToggleButtonGroupDemoSection />
    </section>
  );
}
