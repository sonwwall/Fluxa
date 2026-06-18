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
      return (
        <h1 className={getHeadingClass(1)} id={id}>
          {children}
        </h1>
      );
    },
    h2({ children, id }) {
      return (
        <h2 className={getHeadingClass(2)} id={id}>
          {children}
        </h2>
      );
    },
    h3({ children, id }) {
      return (
        <h3 className={getHeadingClass(3)} id={id}>
          {children}
        </h3>
      );
    },
    h4({ children, id }) {
      return (
        <h4 className={getHeadingClass(4)} id={id}>
          {children}
        </h4>
      );
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
