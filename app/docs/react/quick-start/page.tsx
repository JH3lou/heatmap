import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "React · Quick Start — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Quick Start"
      lead="One tag with HeatmapPanel, or full control with Heatmap + useHeatmap."
    >
      <DocH2>HeatmapPanel (recommended)</DocH2>
      <DocP>
        <InlineCode>HeatmapPanel</InlineCode> owns the selection state internally. Pass{" "}
        <InlineCode>data</InlineCode>, <InlineCode>config</InlineCode>,{" "}
        <InlineCode>initialType</InlineCode> and read the filtered rows back through{" "}
        <InlineCode>onFilter</InlineCode>:
      </DocP>
      <CodeBlock
        lang="tsx"
        code={`import { HeatmapPanel, type HeatmapConfig } from "@jh3lou/account-heatmap"
import "@jh3lou/account-heatmap/styles.css"
import { useState } from "react"

export function Dashboard({ accounts }: { accounts: Account[] }) {
  const [rows, setRows] = useState(accounts)

  return (
    <div className="grid grid-cols-4 gap-6">
      <HeatmapPanel
        className="col-span-1"
        data={accounts}
        config={config}
        initialType="status"
        title="Accounts"
        onFilter={({ filteredData }) => setRows(filteredData)}
      />
      <table className="col-span-3">{/* render rows */}</table>
    </div>
  )
}`}
      />
      <DocP>
        <InlineCode>onFilter</InlineCode> fires on mount and whenever the selection changes, with{" "}
        <InlineCode>{"{ filteredData, selectedType, selectedCategories }"}</InlineCode>.
      </DocP>

      <DocH2>Controlled usage (advanced)</DocH2>
      <DocP>
        Reach for <InlineCode>Heatmap</InlineCode> + <InlineCode>useHeatmap</InlineCode> when you
        must own the selection state — e.g. syncing it to the URL or sharing it across widgets:
      </DocP>
      <CodeBlock
        lang="tsx"
        code={`import { Heatmap, useHeatmap } from "@jh3lou/account-heatmap"

const {
  selectedType, selectedCategories, filteredData,
  handleCategoryClick, handleTypeChange, clearFilters,
} = useHeatmap({ data: accounts, config, initialType: "status" })

<Heatmap
  data={accounts}
  config={config}
  selectedType={selectedType}
  onTypeChange={handleTypeChange}
  selectedCategories={selectedCategories}
  onCategoryClick={handleCategoryClick}
  onClearFilters={clearFilters}
  title="Accounts"
  orientation="vertical"
/>`}
      />
      <Callout variant="warning">
        <InlineCode>&lt;Heatmap /&gt;</InlineCode> is fully controlled — it holds zero state. All
        seven wiring props are required; rendering it without them will not manage itself.
      </Callout>

      <DocH2>Choosing an orientation</DocH2>
      <DocP>
        <InlineCode>vertical</InlineCode> for a sidebar next to a table;{" "}
        <InlineCode>horizontal</InlineCode> for a bar above a table (adds a clickable legend);{" "}
        <InlineCode>inline</InlineCode> (a boolean prop, combinable with either orientation) to
        drop the card wrapper and embed in your own tile — label detail scales down automatically
        with bar height.
      </DocP>
    </DocPage>
  )
}
