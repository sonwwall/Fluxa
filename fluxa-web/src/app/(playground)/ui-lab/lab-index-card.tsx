"use client";

import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

import type { LabEntry } from "./lab-index-data";

export function LabIndexCard({ entry }: { entry: LabEntry }) {
  return (
    <Card className="group overflow-hidden border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-5 h-32 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,0.24),rgba(124,77,255,0.14)),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.22),transparent_30%)]" />
      <Card.Header className="p-0">
        <div className="flex w-full items-start justify-between gap-4">
          <div>
            <Card.Title className="text-2xl text-white">{entry.title}</Card.Title>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/35">
              {entry.href}
            </p>
          </div>
          <Chip className="bg-sky-400/15 text-sky-200" size="sm">
            {entry.status}
          </Chip>
        </div>
      </Card.Header>
      <Card.Content className="mt-4 p-0">
        <p className="text-sm leading-6 text-white/58">{entry.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Chip className="bg-white/[0.06] text-white/65" key={tag} size="sm">
              {tag}
            </Chip>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className="mt-6 p-0">
        <Link href={entry.href}>
          <Button className="shadow-[0_0_24px_rgba(56,189,248,0.28)]" variant="primary">
            打开页面
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
