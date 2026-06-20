import Link from "next/link";

import { LocalizedText } from "@/features/i18n/i18n";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-[#171717]">
      <section className="flex max-w-md flex-col gap-4 rounded-lg border border-black/10 bg-white p-6">
        <p className="text-sm font-medium text-black/50">404</p>
        <h1 className="text-2xl font-semibold"><LocalizedText k="notFound.title" /></h1>
        <p className="text-sm leading-6 text-black/60">
          <LocalizedText k="notFound.description" />
        </p>
        <Link
          className="w-fit rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white"
          href="/ui-lab"
        >
          <LocalizedText k="notFound.back" />
        </Link>
      </section>
    </main>
  );
}
