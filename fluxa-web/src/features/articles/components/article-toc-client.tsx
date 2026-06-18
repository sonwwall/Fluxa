"use client";

import { useEffect, useMemo, useState } from "react";

export type TocTreeItem = {
  children: TocTreeItem[];
  heading: {
    id: string;
    level: number;
    text: string;
    type: "heading";
  };
};

type ArticleTocClientProps = {
  items: TocTreeItem[];
};

export function ArticleTocClient({ items }: ArticleTocClientProps) {
  const headingIds = useMemo(() => flattenTocItems(items).map((item) => item.heading.id), [items]);
  const [activeId, setActiveId] = useState(headingIds[0] ?? "");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const visibleActiveId = useMemo(
    () => getVisibleActiveHeadingId(items, activeId, expandedIds),
    [activeId, expandedIds, items],
  );

  useEffect(() => {
    if (headingIds.length === 0) {
      return;
    }

    const updateActiveHeading = () => {
      const activeHeading = headingIds
        .map((id) => document.getElementById(id))
        .filter((heading): heading is HTMLElement => Boolean(heading))
        .findLast((heading) => heading.getBoundingClientRect().top <= 120);

      setActiveId(activeHeading?.id ?? headingIds[0]);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headingIds]);

  function toggleExpanded(id: string) {
    setExpandedIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }
      return nextIds;
    });
  }

  return (
    <div className="relative mt-6 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
      <div className="absolute bottom-2 left-1.5 top-2 w-px bg-white/20" />
      <div className="space-y-4">
        {items.map((item) => (
          <TocItem
            activeId={visibleActiveId}
            expandedIds={expandedIds}
            item={item}
            key={item.heading.id}
            onToggle={toggleExpanded}
          />
        ))}
      </div>
    </div>
  );
}

type TocItemProps = {
  activeId: string;
  depth?: number;
  expandedIds: Set<string>;
  item: TocTreeItem;
  onToggle: (id: string) => void;
};

function TocItem({
  activeId,
  depth = 0,
  expandedIds,
  item,
  onToggle,
}: TocItemProps) {
  const hasChildren = item.children.length > 0;
  const isActive = activeId === item.heading.id;
  const isExpanded = expandedIds.has(item.heading.id);

  return (
    <div className={depth > 0 ? "pl-5" : ""}>
      <div className="group relative flex gap-4">
        {hasChildren ? (
          <button
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
            className={getMarkerClassName(isActive)}
            onClick={() => onToggle(item.heading.id)}
            type="button"
          >
            <span
              className={`text-[8px] leading-none text-[#050b18] transition ${
                isExpanded ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>
        ) : (
          <span className={getMarkerClassName(isActive)} />
        )}
        <a
          className={`min-w-0 text-sm transition hover:text-sky-200 ${
            isActive ? "text-sky-300" : depth > 0 ? "text-white/58" : "text-white/72"
          }`}
          href={`#${item.heading.id}`}
          onClick={() => {
            if (hasChildren && !isExpanded) {
              onToggle(item.heading.id);
            }
            setTimeout(() => {
              window.dispatchEvent(new Event("scroll"));
            }, 0);
          }}
        >
          {item.heading.text}
        </a>
      </div>
      {hasChildren && isExpanded ? (
        <div className="mt-4 space-y-4">
          {item.children.map((child) => (
            <TocItem
              activeId={activeId}
              depth={depth + 1}
              expandedIds={expandedIds}
              item={child}
              key={child.heading.id}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function getMarkerClassName(active: boolean) {
  return `mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${
    active ? "bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.95)]" : "bg-white/42"
  } transition group-hover:bg-sky-200`;
}

function flattenTocItems(items: TocTreeItem[]): TocTreeItem[] {
  return items.flatMap((item) => [item, ...flattenTocItems(item.children)]);
}

function getVisibleActiveHeadingId(
  items: TocTreeItem[],
  activeId: string,
  expandedIds: Set<string>,
) {
  const firstHeadingId = items[0]?.heading.id ?? "";

  for (const item of items) {
    const visibleActiveId = findVisibleActiveHeadingId(item, activeId, expandedIds, "", true);
    if (visibleActiveId) {
      return visibleActiveId;
    }
  }

  return firstHeadingId;
}

function findVisibleActiveHeadingId(
  item: TocTreeItem,
  activeId: string,
  expandedIds: Set<string>,
  nearestVisibleId: string,
  isVisible: boolean,
): string | null {
  const currentVisibleId = isVisible ? item.heading.id : nearestVisibleId;

  if (item.heading.id === activeId) {
    return currentVisibleId;
  }

  const areChildrenVisible = isVisible && expandedIds.has(item.heading.id);

  for (const child of item.children) {
    const visibleActiveId = findVisibleActiveHeadingId(
      child,
      activeId,
      expandedIds,
      currentVisibleId,
      areChildrenVisible,
    );

    if (visibleActiveId) {
      return visibleActiveId;
    }
  }

  return null;
}
