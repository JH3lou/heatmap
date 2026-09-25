"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/", label: "Demo" },
  { href: "/docs/react", label: "Docs", activePrefix: "/docs" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header
      data-slot="site-header"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-4 w-4 rounded-sm bg-gradient-to-br from-blue-600 to-emerald-500" aria-hidden />
          Account Heatmap
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          {LINKS.map((l) => {
            const active = l.activePrefix ? pathname.startsWith(l.activePrefix) : pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors",
                  active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center">
          <a
            href="https://github.com/JH3lou/heatmap"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
