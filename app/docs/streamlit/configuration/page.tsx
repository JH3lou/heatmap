import { DocPage, DocH2, DocP, InlineCode, Callout, PropsTable } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Streamlit · Configuration — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Configuration"
      lead="The config is pure JSON — declarative rules that cross the Python↔JS bridge. Same schema as the React package's buildConfigFromRules."
    >
      <DocH2>Schema</DocH2>
      <DocP>
        <InlineCode>config</InlineCode> maps a <strong>type key</strong> to a definition with a{" "}
        <InlineCode>label</InlineCode> and a list of <InlineCode>categories</InlineCode>. Each
        category has a <InlineCode>label</InlineCode> (display name and filter key), a{" "}
        <InlineCode>color</InlineCode> (Tailwind background class), and{" "}
        <InlineCode>rules</InlineCode> (AND-ed together):
      </DocP>
      <CodeBlock
        lang="python"
        code={`config = {
    "cash": {
        "label": "Cash Levels",
        "categories": [
            {"label": "HighCash",   "color": "bg-blue-600",
             "rules": [{"field": "cashPercent", "op": ">", "value": 15}]},
            {"label": "MediumCash", "color": "bg-blue-400",
             "rules": [{"field": "cashPercent", "op": "between", "value": [5, 15]}]},
            {"label": "LowCash",    "color": "bg-blue-200",
             "rules": [{"field": "cashPercent", "op": "<", "value": 5}]},
        ],
    },
    "drift": {
        "label": "Drift Analysis",
        "categories": [
            # "abs": True compares the absolute value of the field
            {"label": "HighDrift", "color": "bg-red-600",
             "rules": [{"field": "driftPercent", "op": ">", "value": 3, "abs": True}]},
        ],
    },
}`}
      />

      <DocH2>Rule operators</DocH2>
      <PropsTable
        labels={{ name: "Operator", type: "Value" }}
        rows={[
          { name: "> < >= <=", type: "number", description: "Numeric comparison against value." },
          { name: "== !=", type: "number | string | bool", description: "Equality / inequality." },
          { name: "between", type: "[min, max]", description: "Inclusive range check." },
        ]}
      />
      <DocP>
        A rule is <InlineCode>{"{'field', 'op', 'value', 'abs'?}"}</InlineCode>. Multiple rules on
        one category are AND-ed; a row matches a category when all of its rules pass.
      </DocP>

      <DocH2>Colors</DocH2>
      <DocP>
        <InlineCode>color</InlineCode> accepts any standard Tailwind background class — the full
        palette is bundled in the compiled frontend, so{" "}
        <InlineCode>&quot;bg-purple-600&quot;</InlineCode>,{" "}
        <InlineCode>&quot;bg-emerald-400&quot;</InlineCode>, etc. all work with no extra setup.
      </DocP>

      <Callout>
        Field names are matched against your row keys exactly — with a DataFrame, that&apos;s the
        column names. A typo in <InlineCode>field</InlineCode> silently matches nothing, so if a
        category unexpectedly shows zero, check the field name first.
      </Callout>
    </DocPage>
  )
}
