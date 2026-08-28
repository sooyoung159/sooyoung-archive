"use client";

import ReactMarkdown from "react-markdown";
import { CodeBlock } from "@/components/code-block";
import { slugifyHeading } from "@/lib/markdown";
import { Hash } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl prose-img:shadow-sm">
      <ReactMarkdown
        components={{
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = slugifyHeading(text);
            return (
              <h2
                id={id}
                className="group relative flex items-center font-bold tracking-tight text-foreground border-b border-border/60 pb-2 mt-10 mb-4"
                {...props}
              >
                <a
                  href={`#${id}`}
                  className="absolute -left-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity pr-1"
                  aria-label={`${text} 바로가기`}
                >
                  <Hash className="size-4 inline" />
                </a>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = slugifyHeading(text);
            return (
              <h3
                id={id}
                className="group relative flex items-center font-semibold text-foreground mt-8 mb-3"
                {...props}
              >
                <a
                  href={`#${id}`}
                  className="absolute -left-5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity pr-1"
                  aria-label={`${text} 바로가기`}
                >
                  <Hash className="size-3.5 inline" />
                </a>
                {children}
              </h3>
            );
          },
          pre: ({ children }) => {
            // Let the code component handle formatting
            return <>{children}</>;
          },
          code: ({ className, children, ...props }) => {
            const isInline = !className && typeof children === "string" && !children.includes("\n");
            if (isInline) {
              return (
                <code
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-foreground"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock className={className}>
                {children}
              </CodeBlock>
            );
          },
          table: ({ children, ...props }) => (
            <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
              <table className="w-full text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-emerald-500/80 bg-emerald-500/5 px-4 py-3 rounded-r-lg my-4 italic text-muted-foreground"
              {...props}
            >
              {children}
            </blockquote>
          ),
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                className="text-emerald-500 underline decoration-emerald-500/40 underline-offset-4 hover:text-emerald-600 transition-colors font-medium"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
