/* eslint-disable @next/next/no-img-element */
import type { ComponentProps, ReactNode } from "react";
import type { Components, ExtraProps } from "react-markdown";

import { getHeadingClass } from "./markdown-renderer-core";

type CodeProps = ComponentProps<"code"> &
  ExtraProps & {
    inline?: boolean;
  };

type MarkdownComponentsOptions = {
  renderCodeBlock?: (code: string, lang: string) => ReactNode | Promise<ReactNode>;
};

export function createMarkdownComponents({
  renderCodeBlock,
}: MarkdownComponentsOptions = {}): Components {
  return {
    a({ children, href, title }) {
      return (
        <a
          className="text-sky-300 underline decoration-sky-300/45 underline-offset-4 transition hover:text-sky-200"
          href={href}
          rel="noreferrer"
          target={href?.startsWith("#") ? undefined : "_blank"}
          title={title}
        >
          {children}
        </a>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="rounded-r-lg border-l-4 border-sky-400 bg-sky-400/8 px-5 py-4 text-white/78">
          {children}
        </blockquote>
      );
    },
    code({ children, className, ...props }: CodeProps) {
      const lang = /language-(\S+)/.exec(className ?? "")?.[1];
      const code = String(children).replace(/\n$/, "");

      if (lang && renderCodeBlock) {
        return renderCodeBlock(code, lang);
      }

      return (
        <code
          className="rounded bg-white/10 px-1.5 py-0.5 text-[0.92em] text-sky-100 before:content-none after:content-none"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1({ children, id }) {
      return <MarkdownHeading id={id} level={1}>{children}</MarkdownHeading>;
    },
    h2({ children, id }) {
      return <MarkdownHeading id={id} level={2}>{children}</MarkdownHeading>;
    },
    h3({ children, id }) {
      return <MarkdownHeading id={id} level={3}>{children}</MarkdownHeading>;
    },
    h4({ children, id }) {
      return <MarkdownHeading id={id} level={4}>{children}</MarkdownHeading>;
    },
    h5({ children, id }) {
      return <MarkdownHeading id={id} level={5}>{children}</MarkdownHeading>;
    },
    h6({ children, id }) {
      return <MarkdownHeading id={id} level={6}>{children}</MarkdownHeading>;
    },
    hr() {
      return <hr className="border-white/12" />;
    },
    img({ alt, src, title }) {
      return (
        <img
          alt={alt ?? ""}
          className="my-6 rounded-lg border border-white/10"
          loading="lazy"
          src={src ?? ""}
          title={title}
        />
      );
    },
    input(props) {
      return (
        <input
          className="mr-2 align-middle accent-sky-300"
          disabled
          readOnly
          type="checkbox"
          {...props}
        />
      );
    },
    ol({ children }) {
      return <ol className="list-decimal space-y-1 pl-6">{children}</ol>;
    },
    p({ children }) {
      return <p className="leading-7 text-white/72">{children}</p>;
    },
    pre({ children }) {
      return <div className="not-prose my-6">{children}</div>;
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            {children}
          </table>
        </div>
      );
    },
    tbody({ children }) {
      return <tbody>{children}</tbody>;
    },
    td({ children, style }) {
      return (
        <td className="px-4 py-3" style={style}>
          {children}
        </td>
      );
    },
    th({ children, style }) {
      return (
        <th className="border-b border-white/10 px-4 py-3 font-semibold" style={style}>
          {children}
        </th>
      );
    },
    thead({ children }) {
      return <thead className="bg-white/8 text-white">{children}</thead>;
    },
    tr({ children }) {
      return <tr className="border-t border-white/8">{children}</tr>;
    },
    ul({ children }) {
      return <ul className="list-disc space-y-1 pl-6">{children}</ul>;
    },
  };
}

function MarkdownHeading({
  children,
  id,
  level,
}: {
  children: ReactNode;
  id?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const HeadingTag = `h${level}` as const;

  if (level === 1) {
    return (
      <HeadingTag className={getHeadingClass(level)} id={id}>
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 shrink-0 rotate-45 rounded-[6px] bg-gradient-to-br from-sky-300 via-blue-500 to-violet-400 shadow-[0_0_24px_rgba(56,189,248,0.42)]"
          />
          <span className="min-w-0 break-words">{children}</span>
        </span>
        <span
          aria-hidden="true"
          className="mt-3 block h-px w-full bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400"
        />
      </HeadingTag>
    );
  }

  if (level === 2) {
    return (
      <HeadingTag className={getHeadingClass(level)} id={id}>
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-sky-300 to-blue-500 shadow-[0_0_18px_rgba(56,189,248,0.28)]"
          />
          <span className="min-w-0 break-words">{children}</span>
        </span>
        <span className="mt-2 block border-b border-dashed border-sky-200/45" />
      </HeadingTag>
    );
  }

  if (level === 3) {
    return (
      <HeadingTag className={getHeadingClass(level)} id={id}>
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border-[3px] border-sky-400" />
          <span className="min-w-0 break-words">{children}</span>
        </span>
        <span className="mt-2 block border-b border-dashed border-white/18" />
      </HeadingTag>
    );
  }

  if (level === 4) {
    return (
      <HeadingTag className={getHeadingClass(level)} id={id}>
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-6 w-1 shrink-0 rounded-full bg-sky-400" />
          <span className="min-w-0 break-words">{children}</span>
        </span>
      </HeadingTag>
    );
  }

  if (level === 5) {
    return (
      <HeadingTag className={getHeadingClass(level)} id={id}>
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 rotate-45 border-r-2 border-t-2 border-sky-400"
          />
          <span className="min-w-0 break-words">{children}</span>
        </span>
      </HeadingTag>
    );
  }

  return (
    <HeadingTag className={getHeadingClass(level)} id={id}>
      <span className="flex items-center gap-2.5">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
        <span className="min-w-0 break-words">{children}</span>
      </span>
    </HeadingTag>
  );
}
