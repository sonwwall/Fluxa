"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-[#171717]">
      <section className="flex max-w-md flex-col gap-4 rounded-lg border border-black/10 bg-white p-6">
        <p className="text-sm font-medium text-black/50">Something went wrong</p>
        <h1 className="text-2xl font-semibold">页面暂时无法显示</h1>
        <p className="text-sm leading-6 text-black/60">
          {error.digest ? "错误已记录，请稍后重试。" : "请刷新页面或稍后重试。"}
        </p>
        <button
          className="w-fit rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white"
          onClick={reset}
          type="button"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
