"use client";

import { useEffect, useState } from "react";

import { useI18n } from "@/features/i18n/i18n";

type MarkdownCodeBlockProps = {
  code: string;
  html?: string;
};

export function MarkdownCodeBlock({ code, html }: MarkdownCodeBlockProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  async function copyCode() {
    try {
      await writeClipboardText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="markdown-code-block group relative overflow-hidden rounded-xl border border-sky-200/25 bg-[#151c2e] text-[calc(0.875rem*var(--article-font-scale,1))]">
      <button
        aria-label={copied ? t("code.copied") : t("code.copy")}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-[#0d1424]/90 text-white/58 shadow-sm backdrop-blur transition hover:border-sky-200/35 hover:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300/55"
        onClick={copyCode}
        title={copied ? t("code.copied") : t("code.copy")}
        type="button"
      >
        {copied ? <CheckIcon /> : <ClipboardIcon />}
      </button>
      {html ? (
        <div
          className="[&_pre]:!m-0 [&_pre]:overflow-x-auto [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-6 [&_pre]:!pr-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="m-0 overflow-x-auto p-6 pr-14 text-white/78">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

async function writeClipboardText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.left = "-1000px";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");

    if (!copied) {
      throw new Error("Copy command failed");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M9 5h6" />
      <path d="M9 3.5h6a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 15 7.5H9A1.5 1.5 0 0 1 7.5 6V5A1.5 1.5 0 0 1 9 3.5Z" />
      <path d="M7.5 5.5H6A2.5 2.5 0 0 0 3.5 8v10A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 18 5.5h-1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-emerald-200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}
