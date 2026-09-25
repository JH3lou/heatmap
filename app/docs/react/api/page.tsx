import { DocPage, DocH2, DocP, InlineCode } from "@/components/docs/doc"
import { PropsTable } from "@/components/docs/doc"

export const metadata = { title: "React · API Reference — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage title="API Reference" lead="Every export of @jh3lou/account-heatmap.">
      <DocH2>HeatmapPanel</DocH2>
      <DocP>
        Uncontrolled wrapper — owns selection state. Generic over your row type, so{" "}
        <InlineCode>filteredData</InlineCode> in the callback keeps it.
      </DocP>
      <PropsTable
        rows={[
          { name: "data", type: "T[]", description: "Items to visualize." },
          { name: "config", type: "HeatmapConfig", description: "Heatmap types and their categories." },
          { name: "initialType", type: "string", description: "Which type to show first." },
          { name: "onFilter", type: "(r: HeatmapFilterResult<T>) => void", description: "Fires on mount and on every selection change with { filteredData, selectedType, selectedCategories }." },
          { name: "title", type: "string", description: "Optional heading." },
          { name: "className", type: "string", description: "Extra classes on the root." },
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout orientation." },
          { name: "height", type: "string", default: '"320px"', description: "Bar height (vertical only)." },
          { name: "inline", type: "boolean", default: "false", description: "Remove the card wrapper." },
          { name: "showFilters", type: "boolean", default: "true", description: "Show active-filter chips." },
          { name: "filtersVariant", type: '"default" | "compact" | "inline"', default: '"default"', description: "Filter chip layout." },
        ]}
      />

      <DocH2>Heatmap</DocH2>
      <DocP>Fully controlled. All wiring props are required.</DocP>
      <PropsTable
        rows={[
          { name: "data", type: "any[]", description: "Items to visualize." },
          { name: "config", type: "HeatmapConfig", description: "Heatmap types and their categories." },
          { name: "selectedType", type: "string", description: "Active heatmap type key." },
          { name: "onTypeChange", type: "(type: string) => void", description: "Type-change handler." },
          { name: "selectedCategories", type: "string[]", description: "Currently selected category labels." },
          { name: "onCategoryClick", type: "(category: string) => void", description: "Category toggle handler." },
          { name: "onClearFilters", type: "() => void", description: "Clear-all handler." },
          { name: "title", type: "string", default: '"Heatmap"', description: "Optional heading." },
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout orientation." },
          { name: "height", type: "string", default: '"320px"', description: "Bar height (vertical only)." },
          { name: "inline", type: "boolean", default: "false", description: "Remove the card wrapper." },
          { name: "showFilters", type: "boolean", default: "true", description: "Show the active-filters chips." },
        ]}
      />

      <DocH2>useHeatmap</DocH2>
      <DocP>
        <InlineCode>useHeatmap({"{ data, config, initialType }"})</InlineCode> returns{" "}
        <InlineCode>
          {"{ selectedType, selectedCategories, heatmapCategories, filteredData, handleCategoryClick, handleTypeChange, clearFilters }"}
        </InlineCode>{" "}
        — everything needed to drive <InlineCode>&lt;Heatmap /&gt;</InlineCode> and filter your
        table.
      </DocP>

      <DocH2>buildConfigFromRules</DocH2>
      <DocP>
        Compiles a JSON-serializable <InlineCode>RulesConfig</InlineCode> into a{" "}
        <InlineCode>HeatmapConfig</InlineCode>. See{" "}
        <a className="underline" href="/docs/react/configuration">Configuration</a> for the rule
        schema and operators.
      </DocP>

      <DocH2>Other exports</DocH2>
      <DocP>
        <InlineCode>ActiveFilters</InlineCode>, the <InlineCode>cn</InlineCode> class-merge helper,
        and the underlying shadcn/ui + Radix primitives (<InlineCode>Card</InlineCode>,{" "}
        <InlineCode>Button</InlineCode>, <InlineCode>Badge</InlineCode>,{" "}
        <InlineCode>Select</InlineCode> and their subcomponents) for composing custom layouts with
        the same look and feel.
      </DocP>

      <DocH2>Exported types</DocH2>
      <DocP>
        <InlineCode>HeatmapProps</InlineCode>, <InlineCode>HeatmapPanelProps</InlineCode>,{" "}
        <InlineCode>HeatmapFilterResult</InlineCode>, <InlineCode>HeatmapConfig</InlineCode>,{" "}
        <InlineCode>HeatmapCategory</InlineCode>, <InlineCode>UseHeatmapProps</InlineCode>,{" "}
        <InlineCode>ActiveFiltersProps</InlineCode>, <InlineCode>RulesConfig</InlineCode>,{" "}
        <InlineCode>RuleCategory</InlineCode>, <InlineCode>CategoryRule</InlineCode>,{" "}
        <InlineCode>RuleOperator</InlineCode>.
      </DocP>
    </DocPage>
  )
}
