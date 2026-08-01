"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CodeBlock({
  code,
  lang,
  className,
}: {
  code: string
  lang?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <div
      data-slot="docs-code"
      className={cn("group relative my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950", className)}
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-1.5">
        <span className="text-xs font-medium text-zinc-400">{lang ?? "code"}</span>
        <button
          type="button"
          aria-label="Copy code"
          onClick={() => {
            void navigator.clipboard?.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1400)
          }}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
