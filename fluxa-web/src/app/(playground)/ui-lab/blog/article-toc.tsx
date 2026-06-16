"use client";

import { Card } from "@heroui/react";

import { articleToc } from "./article-detail-data";

export function ArticleToc() {
  return (
    <Card className="sticky top-5 hidden border-white/10 bg-white/[0.035] p-7 xl:block">
      <h2 className="text-lg font-semibold">On this page</h2>
      <div className="relative mt-6">
        <div className="absolute bottom-2 left-1.5 top-2 w-px bg-white/20" />
        <div className="space-y-4">
          {articleToc.map(([number, label, active], index) => (
            <div className="relative flex gap-4" key={`${number}-${label}-${index}`}>
              <span
                className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                  number ? "bg-white/42" : "bg-transparent"
                } ${active ? "shadow-[0_0_18px_rgba(56,189,248,0.95)] !bg-sky-300" : ""}`}
              />
              <p
                className={`text-sm ${
                  active
                    ? "text-sky-300"
                    : number
                      ? "text-white/72"
                      : "pl-5 text-white/46"
                }`}
              >
                {number ? `${number} ` : ""}
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
