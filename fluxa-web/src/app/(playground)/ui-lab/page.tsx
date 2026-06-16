import { LabIndexCard } from "./lab-index-card";
import { labEntries } from "./lab-index-data";

export default function UiLabPage() {
  return (
    <main className="dark min-h-screen bg-[#060913] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] px-4 py-8 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(18,27,48,0.92),rgba(8,12,24,0.96))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#67e8f9,#4f46e5)] shadow-[0_0_28px_rgba(79,70,229,0.48)]">
                <span className="text-sm font-bold">FL</span>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-200/70">
                  Fluxa UI Lab
                </p>
                <p className="text-xs text-white/38">Visual experiments index</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {labEntries.length} active lab
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                实验页面索引
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">
                这里集中放还未进入正式产品路由的视觉和交互实验。后续新增 lab
                页面时，从这里进入，不再让 `/ui-lab` 直接跳到某个单页。
              </p>
            </div>
            <div className="rounded-2xl border border-sky-300/15 bg-sky-400/10 p-4">
              <p className="text-sm font-medium text-sky-100">使用方式</p>
              <p className="mt-2 text-sm leading-6 text-sky-100/70">
                点开卡片查看具体实验。后续新增页面时，只在索引数据里追加入口。
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {labEntries.map((entry) => (
            <LabIndexCard entry={entry} key={entry.href} />
          ))}
        </section>
      </section>
    </main>
  );
}
