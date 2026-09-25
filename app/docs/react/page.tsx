import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "React · Introduction — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Introduction"
      lead="An interactive, filterable stacked-bar heatmap for React. Drop it next to any data table to get click-to-filter category visualizations."
    >
      <DocP>
        <InlineCode>@jh3lou/account-heatmap</InlineCode> renders your rows as a stacked bar per
        category — click a segment to filter. It supports vertical (sidebar) and horizontal
        (top-bar) orientations, an inline (no card) mode for embedding in dashboard tiles, and
        active-filter chips. It is built on shadcn/ui + Radix primitives and styled with
        Tailwind v4 design tokens.
      </DocP>

      <DocH2>Installation</DocH2>
      <CodeBlock lang="bash" code={`npm install @jh3lou/account-heatmap`} />
      <DocP>
        <InlineCode>react</InlineCode> and <InlineCode>react-dom</InlineCode> (&gt;=18) are peer
        dependencies. The Radix/shadcn primitives it uses are regular dependencies and installed
        for you.
      </DocP>

      <DocH2>Pick a stylesheet</DocH2>
      <DocP>The package ships two stylesheets — import exactly one:</DocP>
      <CodeBlock
        lang="tsx"
        code={`// 1. Not using Tailwind (or want it to "just work"):
import "@jh3lou/account-heatmap/styles.css"`}
      />
      <CodeBlock
        lang="css"
        code={`/* 2. Already using Tailwind v4 — tokens only, in your Tailwind entry CSS: */
@import "tailwindcss";
@import "@jh3lou/account-heatmap/theme.css";
@source "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}";`}
      />
      <Callout>
        <strong>Option 1</strong> bundles Tailwind Preflight (a global CSS reset) — import it high
        in your tree. In an app that already has base styles, prefer option 2. See{" "}
        <a className="underline" href="/docs/react/theming">Theming &amp; Styling</a> for the
        runtime-color safelist you&apos;ll need with option 2.
      </Callout>

      <DocH2>Which API should I use</DocH2>
      <DocP>
        Start with <InlineCode>&lt;HeatmapPanel /&gt;</InlineCode> — an uncontrolled wrapper that
        owns its selection state; one tag and an <InlineCode>onFilter</InlineCode> callback. Drop
        down to <InlineCode>&lt;Heatmap /&gt;</InlineCode> + <InlineCode>useHeatmap</InlineCode>{" "}
        only when you need to own the selection yourself (URL sync, sharing state across
        widgets). Continue with <a className="underline" href="/docs/react/quick-start">Quick Start</a>.
      </DocP>
    </DocPage>
  )
}
