export interface DocsNavItem {
  href: string
  label: string
}

export interface DocsNavGroup {
  title: string
  items: DocsNavItem[]
}

/** Single source of truth for the docs sidebar and the prev/next pager. */
export const DOCS_NAV: DocsNavGroup[] = [
  {
    title: "React · npm",
    items: [
      { href: "/docs/react", label: "Introduction" },
      { href: "/docs/react/quick-start", label: "Quick Start" },
      { href: "/docs/react/configuration", label: "Configuration" },
      { href: "/docs/react/theming", label: "Theming & Styling" },
      { href: "/docs/react/api", label: "API Reference" },
      { href: "/docs/react/testing", label: "Testing & Automation" },
    ],
  },
  {
    title: "Streamlit · pip",
    items: [
      { href: "/docs/streamlit", label: "Introduction" },
      { href: "/docs/streamlit/usage", label: "Usage" },
      { href: "/docs/streamlit/configuration", label: "Configuration" },
      { href: "/docs/streamlit/api", label: "API Reference" },
      { href: "/docs/streamlit/development", label: "Development" },
    ],
  },
  {
    title: "Agents",
    items: [{ href: "/docs/agents", label: "Agent Skills" }],
  },
]

export const DOCS_FLAT: DocsNavItem[] = DOCS_NAV.flatMap((g) => g.items)
