import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "React · Theming & Styling — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Theming & Styling"
      lead="Two stylesheets, a runtime-color safelist, dark mode via the .dark class, and full shadcn preset re-theming."
    >
      <DocH2>styles.css vs theme.css</DocH2>
      <DocP>
        <InlineCode>styles.css</InlineCode> is batteries-included: Tailwind + Preflight + the
        design tokens + a safelist of the full color palette. Use it when your app does{" "}
        <em>not</em> run Tailwind v4. <InlineCode>theme.css</InlineCode> contains only the design
        tokens (light + dark, no Preflight) for apps that already run Tailwind v4:
      </DocP>
      <CodeBlock
        lang="css"
        code={`/* your app's Tailwind entry CSS */
@import "tailwindcss";
@import "@jh3lou/account-heatmap/theme.css";     /* design tokens, no Preflight */
@source "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}";`}
      />

      <DocH2>The runtime color gotcha</DocH2>
      <DocP>
        Category colors (<InlineCode>&quot;bg-blue-600&quot;</InlineCode>, …) come from your config
        at runtime, so Tailwind&apos;s compiler never sees them as source.{" "}
        <strong>Symptom: bars render but are invisible/uncolored.</strong> With{" "}
        <InlineCode>styles.css</InlineCode> this is already handled. With your own Tailwind build,
        safelist the shades your config uses:
      </DocP>
      <CodeBlock
        lang="css"
        code={`@source inline("bg-{blue,green,red,emerald,orange,yellow,gray}-{200,400,500,600}");`}
      />

      <DocH2>Dark mode</DocH2>
      <DocP>
        Dark tokens activate under a <InlineCode>.dark</InlineCode> class on any ancestor
        (<InlineCode>@custom-variant dark (&amp;:is(.dark *))</InlineCode>). Toggle it with your
        theme provider (e.g. next-themes). The card, select, and chrome flip; category colors are
        data and stay fixed.
      </DocP>

      <DocH2>Re-theming with shadcn presets</DocH2>
      <DocP>
        The tokens are standard shadcn variables (<InlineCode>--primary</InlineCode>,{" "}
        <InlineCode>--background</InlineCode>, <InlineCode>--card</InlineCode>,{" "}
        <InlineCode>--radius</InlineCode>, …). Paste a shadcn/tweakcn preset&apos;s{" "}
        <InlineCode>:root</InlineCode> / <InlineCode>.dark</InlineCode> block into your global CSS
        and every utility re-themes. To theme only a subtree, set the variables on a wrapper
        element instead of <InlineCode>:root</InlineCode>:
      </DocP>
      <CodeBlock
        lang="css"
        code={`/* scoped: only elements under [data-brand] pick these up */
[data-brand] {
  --primary: oklch(0.55 0.24 293);
  --radius: 0.5rem;
}
[data-brand].dark {
  --primary: oklch(0.7 0.19 293);
}`}
      />
      <Callout>
        Try this live: the demo&apos;s <strong>Theme Playground</strong> layout (Demo → Theme
        Playground) scopes pasted presets to a preview pane and renders the same components on
        Radix, Base UI, or React Aria.
      </Callout>
    </DocPage>
  )
}
