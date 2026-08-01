import * as React from "react"
import { Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** Page wrapper: title + lead + prose spacing. */
export function DocPage({
  title,
  lead,
  children,
}: {
  title: string
  lead: string
  children: React.ReactNode
}) {
  return (
    <article data-slot="docs-content" className="mx-auto w-full min-w-0 max-w-3xl">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-base text-muted-foreground">{lead}</p>
      <div className="mt-8 space-y-4">{children}</div>
    </article>
  )
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")

/** Anchored section heading (shadcn-docs style, hover to reveal the # link). */
export function DocH2({ children }: { children: string }) {
  const id = slugify(children)
  return (
    <h2 id={id} className="group mt-10 flex scroll-m-20 items-center gap-2 border-b pb-2 text-xl font-semibold tracking-tight">
      {children}
      <a href={`#${id}`} aria-label={`Link to ${children}`} className="opacity-0 transition-opacity group-hover:opacity-100">
        <LinkIcon className="h-4 w-4 text-muted-foreground" />
      </a>
    </h2>
  )
}

export function DocP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 text-foreground/90">{children}</p>
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-[0.35rem] py-[0.15rem] font-mono text-[0.85em] font-medium">
      {children}
    </code>
  )
}

export function Callout({
  children,
  variant = "note",
}: {
  children: React.ReactNode
  variant?: "note" | "warning"
}) {
  return (
    <div
      className={cn(
        "my-4 rounded-lg border-l-4 px-4 py-3 text-sm leading-6",
        variant === "warning"
          ? "border-l-amber-500 bg-amber-50 text-amber-900"
          : "border-l-blue-500 bg-blue-50 text-blue-900",
      )}
    >
      {children}
    </div>
  )
}

export interface PropRow {
  name: string
  type?: string
  default?: string
  description: string
}

export interface PropsTableLabels {
  name?: string
  type?: string
  default?: string
  description?: string
}

/**
 * shadcn-style props/API table. Column labels are overridable (so the same
 * table serves operators, locators, and skills), and the Type / Default
 * columns auto-hide when no row provides them.
 */
export function PropsTable({ rows, labels }: { rows: PropRow[]; labels?: PropsTableLabels }) {
  const showType = rows.some((r) => r.type !== undefined)
  const showDefault = rows.some((r) => r.default !== undefined)

  return (
    <div className="my-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-4 py-2 font-medium">{labels?.name ?? "Prop"}</th>
            {showType && <th className="px-4 py-2 font-medium">{labels?.type ?? "Type"}</th>}
            {showDefault && <th className="px-4 py-2 font-medium">{labels?.default ?? "Default"}</th>}
            <th className="px-4 py-2 font-medium">{labels?.description ?? "Description"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b last:border-0 align-top">
              <td className="whitespace-nowrap px-4 py-2 font-mono text-[13px] font-semibold">{r.name}</td>
              {showType && (
                <td className="px-4 py-2 font-mono text-[13px] text-muted-foreground">{r.type}</td>
              )}
              {showDefault && (
                <td className="whitespace-nowrap px-4 py-2 font-mono text-[13px] text-muted-foreground">{r.default ?? "—"}</td>
              )}
              <td className="px-4 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
