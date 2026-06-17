import type { AuthorArticleStatus } from "../types";

export function formatAdminDate(value: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function getStatusLabel(status: AuthorArticleStatus) {
  const labels: Record<AuthorArticleStatus, string> = {
    archived: "Archived",
    draft: "Draft",
    published: "Published",
    scheduled: "Scheduled",
  };

  return labels[status];
}

export function getStatusClass(status: AuthorArticleStatus) {
  const classes: Record<AuthorArticleStatus, string> = {
    archived: "bg-white/[0.06] text-white/56",
    draft: "bg-amber-400/12 text-amber-100",
    published: "bg-emerald-400/12 text-emerald-100",
    scheduled: "bg-blue-400/12 text-blue-100",
  };

  return classes[status];
}
