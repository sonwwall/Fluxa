import Link from "next/link";

import { sidebarItems } from "./admin-data";

type AdminSidebarProps = {
  active?: "Dashboard" | "Posts";
};

export function AdminSidebar({ active = "Dashboard" }: AdminSidebarProps) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#07101f] p-5 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="text-3xl text-violet-300">✦</div>
        <span className="text-2xl font-semibold">Fluxa</span>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {sidebarItems.map(([icon, label, href]) => (
          <Link
            className={`flex items-center gap-4 rounded-lg px-4 py-3 text-left text-sm transition ${
              label === active
                ? "bg-violet-500/22 text-white shadow-[0_0_28px_rgba(139,92,246,0.25)]"
                : "text-white/68 hover:bg-white/[0.045]"
            }`}
            href={href}
            key={label}
          >
            <span className="w-5 text-lg text-violet-200">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
      <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,#818cf8,#111827)]">
            外
          </div>
          <div>
            <p className="font-medium">外城</p>
            <p className="text-xs text-violet-300">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
