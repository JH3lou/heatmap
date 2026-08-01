"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

type Framework = "npm" | "nextjs" | "vite"

interface Snippet {
  id: Framework
  label: string
  blurb: string
  code: string
}

const SNIPPETS: Snippet[] = [
  {
    id: "npm",
    label: "npm package",
    blurb: "Install the published component and its stylesheet in any React app.",
    code: `# 1. install
npm install @jh3lou/account-heatmap

# 2. use it (batteries-included stylesheet)
import { HeatmapPanel } from "@jh3lou/account-heatmap"
import "@jh3lou/account-heatmap/styles.css"

export function Demo({ rows, config }) {
  return (
    <HeatmapPanel
      data={rows}
      config={config}
      initialType="status"
      onFilter={({ filteredData }) => console.log(filteredData)}
    />
  )
}`,
  },
  {
    id: "nextjs",
    label: "Next.js (Tailwind v4)",
    blurb: "Already running Tailwind v4? Import the tokens and add the package to your @source globs.",
    code: `# app/globals.css
@import "tailwindcss";
@import "@jh3lou/account-heatmap/theme.css";        /* design tokens, no Preflight */
@source "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}";

# Category colors are runtime strings (e.g. "bg-blue-600"),
# so safelist the palette your config uses:
@source inline("bg-{blue,green,red,emerald,orange,yellow,gray}-{200,400,500,600}");

# app/page.tsx  ("use client")
import { HeatmapPanel } from "@jh3lou/account-heatmap"`,
  },
  {
    id: "vite",
    label: "Vite + React",
    blurb: "A minimal Vite setup. The stylesheet ships Preflight, so import it once at the entry.",
    code: `# main.tsx
import "@jh3lou/account-heatmap/styles.css"
import { HeatmapPanel } from "@jh3lou/account-heatmap"

# vite.config.ts — nothing special required; the package is pre-built ESM/CJS.
# For declarative configs across the JS<->data boundary use buildConfigFromRules:
import { buildConfigFromRules } from "@jh3lou/account-heatmap"`,
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      data-slot="playground-copy"
      aria-label="Copy code"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1400)
      }}
      className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export function FrameworkSnippets() {
  const [active, setActive] = React.useState<Framework>("npm")
  const current = SNIPPETS.find((s) => s.id === active)!

  return (
    <div data-slot="playground-frameworks">
      <div role="tablist" aria-label="Framework setup" className="flex gap-1 border-b border-border">
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            aria-selected={active === s.id}
            data-slot="playground-framework-tab"
            data-framework={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              active === s.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{current.blurb}</p>
          <CopyButton text={current.code} />
        </div>
        <pre
          data-slot="playground-framework-code"
          className="overflow-x-auto rounded-md border border-border bg-muted/50 p-3 text-xs leading-relaxed"
        >
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  )
}
