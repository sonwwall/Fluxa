import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-[#171717]">
      <section className="flex max-w-md flex-col gap-4 rounded-lg border border-black/10 bg-white p-6">
        <p className="text-sm font-medium text-black/50">404</p>
        <h1 className="text-2xl font-semibold">页面不存在</h1>
        <p className="text-sm leading-6 text-black/60">
          这个地址还没有对应页面，当前可先回到 UI Lab 继续调整视觉方向。
        </p>
        <Link
          className="w-fit rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white"
          href="/ui-lab"
        >
          Back to UI Lab
        </Link>
      </section>
    </main>
  );
}
