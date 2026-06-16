"use client";

import { Card } from "@heroui/react";

import { statItems } from "./admin-data";

export function StatGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map(([icon, value, label, delta, gradient]) => (
        <Card className="border-white/10 bg-white/[0.035] p-5" key={label}>
          <div className="flex items-center gap-5">
            <div className={`grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-2xl shadow-[0_0_28px_rgba(96,165,250,0.26)]`}>
              {icon}
            </div>
            <div>
              <p className="text-3xl font-semibold">{value}</p>
              <p className="text-sm text-white/58">{label}</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-emerald-300/80">{delta}</p>
        </Card>
      ))}
    </section>
  );
}
