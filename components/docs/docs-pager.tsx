"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DOCS_FLAT } from "./docs-nav"

/** Prev / next links across the flattened docs order (shadcn-docs style). */
export function DocsPager() {
  const pathname = usePathname()
  const index = DOCS_FLAT.findIndex((i) => i.href === pathname)
  if (index === -1) return null

  const prev = DOCS_FLAT[index - 1]
  const next = DOCS_FLAT[index + 1]

  return (
    <div data-slot="docs-pager" className="mt-12 flex items-center justify-between border-t pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
        >
          {next.label}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
