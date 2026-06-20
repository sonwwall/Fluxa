import { LocalizedText } from "@/features/i18n/i18n";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-[#171717]">
      <p className="text-sm font-medium text-black/55"><LocalizedText k="loading" /></p>
    </main>
  );
}
