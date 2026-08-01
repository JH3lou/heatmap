import { DocPage, DocH2, DocP, InlineCode, Callout, PropsTable } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "React · Configuration — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Configuration"
      lead="The config maps a type key to a label and its categories. Define categories as functions for full power, or as serializable rules."
    >
      <DocH2>Function-based config</DocH2>
      <DocP>
        <InlineCode>HeatmapConfig</InlineCode> gives each type a{" "}
        <InlineCode>categories(data)</InlineCode> function returning{" "}
        <InlineCode>{"{ label, color, count, filter }"}</InlineCode> per category. Full
        expressive power — any predicate you can write:
      </DocP>
      <CodeBlock
        lang="ts"
        code={`const config: HeatmapConfig = {
  status: {
    label: "Account Status",
    categories: (data: Account[]) => [
      {
        label: "Active",
        color: "bg-green-600",
        count: data.filter(a => a.status === "Active").length,
        filter: a => a.status === "Active",
      },
      {
        label: "Pending",
        color: "bg-yellow-600",
        count: data.filter(a => a.status === "Pending").length,
        filter: a => a.status === "Pending",
      },
    ],
  },
}`}
      />

      <DocH2>Declarative rules config</DocH2>
      <DocP>
        When the config must cross a serialization boundary (an API response, a Python/Streamlit
        bridge) you can&apos;t ship functions. Describe categories as rules and compile them with{" "}
        <InlineCode>buildConfigFromRules</InlineCode>:
      </DocP>
      <CodeBlock
        lang="ts"
        code={`import { buildConfigFromRules } from "@jh3lou/account-heatmap"

const config = buildConfigFromRules({
  cash: {
    label: "Cash Levels",
    categories: [
      { label: "HighCash",   color: "bg-blue-600", rules: [{ field: "cashPercent", op: ">", value: 15 }] },
      { label: "MediumCash", color: "bg-blue-400", rules: [{ field: "cashPercent", op: "between", value: [5, 15] }] },
      { label: "LowCash",    color: "bg-blue-200", rules: [{ field: "cashPercent", op: "<", value: 5 }] },
    ],
  },
  drift: {
    label: "Drift Analysis",
    categories: [
      // abs: true compares the absolute value of the field
      { label: "HighDrift", color: "bg-red-600", rules: [{ field: "driftPercent", op: ">", value: 3, abs: true }] },
    ],
  },
})`}
      />

      <DocH2>Rule operators</DocH2>
      <PropsTable
        rows={[
          { name: "> < >= <=", type: "number", description: "Numeric comparison against value." },
          { name: "== !=", type: "number | string | boolean", description: "Equality / inequality." },
          { name: "between", type: "[min, max]", description: "Inclusive range check." },
        ]}
      />
      <DocP>
        Multiple rules on one category are AND-ed together. Add{" "}
        <InlineCode>&quot;abs&quot;: true</InlineCode> to compare the absolute value of a numeric
        field (handy for drift/variance).
      </DocP>

      <Callout>
        Category <InlineCode>color</InlineCode> is a Tailwind background class (e.g.{" "}
        <InlineCode>&quot;bg-blue-600&quot;</InlineCode>) applied at runtime. If you build your own
        Tailwind CSS, these classes must be safelisted — see{" "}
        <a className="underline" href="/docs/react/theming">Theming &amp; Styling</a>.
      </Callout>
    </DocPage>
  )
}
