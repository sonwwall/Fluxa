"use client";

import { Card, Chip } from "@heroui/react";

import { skillGroups } from "./about-data";
import { AboutSectionTitle } from "./about-section-title";

export function SkillsSection() {
  return (
    <section className="space-y-5">
      <AboutSectionTitle>Skills</AboutSectionTitle>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {skillGroups.map(([title, ...skills]) => (
          <Card className="border-white/10 bg-white/[0.04] p-5" key={title}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Chip className="bg-white/[0.035] text-white/72" key={skill}>
                  {skill}
                </Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
