"use client";

const labelClass =
  "mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-black/55";

export const sectionClass =
  "rounded-lg border border-black/10 bg-white/80 p-5 shadow-[0_18px_45px_rgba(23,23,23,0.06)]";

export function NumberLabel({ id, title }: { id: string; title: string }) {
  return (
    <div className={labelClass}>
      <span className="grid h-8 min-w-8 place-items-center rounded-md bg-[#171717] px-2 text-xs text-white">
        {id}
      </span>
      <span>{title}</span>
    </div>
  );
}
