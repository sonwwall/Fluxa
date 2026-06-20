"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

import { useI18n } from "@/features/i18n/i18n";

const STORAGE_KEY = "fluxa.articleFontScale";

const FONT_SIZES = [
  { key: "font.small", scale: 0.8 },
  { key: "font.compact", scale: 0.9 },
  { key: "font.standard", scale: 1 },
  { key: "font.loose", scale: 1.1 },
] as const;

type ArticleReadingFontControlsProps = {
  children: ReactNode;
};

export function ArticleReadingFontControls({ children }: ArticleReadingFontControlsProps) {
  const { t } = useI18n();
  const [fontScale, setFontScale] = useState(1);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const savedScale = window.localStorage.getItem(STORAGE_KEY);
    const matchedScale = FONT_SIZES.find((item) => item.scale.toString() === savedScale)?.scale;

    if (matchedScale) {
      setFontScale(matchedScale);
    }
  }, []);

  function selectFontScale(scale: number) {
    setFontScale(scale);
    window.localStorage.setItem(STORAGE_KEY, scale.toString());
  }

  return (
    <section
      className="relative"
      style={{ "--article-font-scale": fontScale } as CSSProperties}
    >
      {children}
      <div className="fixed bottom-4 right-0 z-50 flex items-end gap-2">
        {isPanelOpen ? (
          <aside className="mb-0 w-[min(13.5rem,calc(100vw-4.75rem))] rounded-lg border border-white/12 bg-[#07101f]/94 p-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-white/86">
                <FontSizeIcon />
                <span>{t("font.size")}</span>
              </div>
              <span className="text-xs text-white/42">{Math.round(fontScale * 100)}%</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {FONT_SIZES.map((item) => {
                const isActive = item.scale === fontScale;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`rounded-md border px-2.5 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-sky-300/55 ${
                      isActive
                        ? "border-sky-300/55 bg-sky-300/16 text-sky-100"
                        : "border-white/10 bg-white/[0.035] text-white/62 hover:border-sky-200/35 hover:text-white"
                    }`}
                    key={item.scale}
                    onClick={() => selectFontScale(item.scale)}
                    type="button"
                  >
                    {t(item.key)}
                  </button>
                );
              })}
            </div>
          </aside>
        ) : null}
        <button
          aria-expanded={isPanelOpen}
          aria-label={isPanelOpen ? t("font.collapse") : t("font.expand")}
          className="grid h-11 w-11 place-items-center rounded-l-lg border border-r-0 border-white/12 bg-[#07101f]/94 text-sky-200 shadow-[0_12px_36px_rgba(0,0,0,0.32)] backdrop-blur-md transition hover:border-sky-200/35 hover:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300/55"
          onClick={() => setIsPanelOpen((value) => !value)}
          title={isPanelOpen ? t("font.collapse") : t("font.expand")}
          type="button"
        >
          <span className="sr-only">{isPanelOpen ? t("font.collapse") : t("font.expand")}</span>
          <span aria-hidden="true" className="flex items-center">
            <FontSizeIcon />
          </span>
        </button>
      </div>
    </section>
  );
}

function FontSizeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-sky-300"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4 7V5h10v2" />
      <path d="M9 5v14" />
      <path d="M6.5 19h5" />
      <path d="M14 12v-1.5h6V12" />
      <path d="M17 10.5V19" />
      <path d="M15.5 19h3" />
    </svg>
  );
}
