"use client";

import { useI18n } from "@/features/i18n/i18n";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-[#171717]">
      <section className="flex max-w-md flex-col gap-4 rounded-lg border border-black/10 bg-white p-6">
        <p className="text-sm font-medium text-black/50">{t("error.summary")}</p>
        <h1 className="text-2xl font-semibold">{t("error.title")}</h1>
        <p className="text-sm leading-6 text-black/60">
          {error.digest ? t("error.recorded") : t("error.retryLater")}
        </p>
        <button
          className="w-fit rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white"
          onClick={reset}
          type="button"
        >
          {t("error.retry")}
        </button>
      </section>
    </main>
  );
}
