"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export function CodeBlock({ children, className, inline }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as { props?: { children?: React.ReactNode } }).props?.children);
    }
    return "";
  };

  const rawCode = extractText(children).replace(/\n$/, "");

  // If inline code snippet (e.g. `const x = 1`)
  if (inline) {
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-foreground">
        {children}
      </code>
    );
  }

  // Parse language
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "code";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </span>
          <span className="ml-1.5 text-zinc-400">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="코드 복사"
          className="flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">복사됨!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-zinc-400" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4 text-[13.5px] leading-relaxed font-mono">
        <pre className="!bg-transparent !p-0 !m-0 font-mono text-zinc-200">
          <code className={className}>{children}</code>
        </pre>
      </div>
    </div>
  );
}
