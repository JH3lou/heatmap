"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DOCS_NAV } from "./docs-nav"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav data-slot="docs-sidebar" aria-label="Docs" className="w-full">
      {DOCS_NAV.map((group) => (
        <div key={group.title} className="pb-6">
          <h4 className="mb-2 px-2 text-sm font-semibold">{group.title}</h4>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
