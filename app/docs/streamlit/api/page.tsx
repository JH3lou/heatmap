import { DocPage, DocH2, DocP, InlineCode, PropsTable } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Streamlit · API Reference — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage title="API Reference" lead="account_heatmap() and the HeatmapResult it returns.">
      <DocH2>account_heatmap</DocH2>
      <PropsTable
        rows={[
          { name: "data", type: "list[dict] | pd.DataFrame", description: "Rows to visualize." },
          { name: "config", type: "dict", description: "Declarative rules config (see Configuration)." },
          { name: "initial_type", type: "str", default: "first key", description: "Which type to show first." },
          { name: "title", type: "str", default: '"Heatmap"', description: "Heading above the heatmap." },
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout." },
          { name: "height", type: "str", default: '"320px"', description: "Bar height (vertical only)." },
          { name: "inline", type: "bool", default: "False", description: "Drop the card wrapper." },
          { name: "show_filters", type: "bool", default: "True", description: "Show active-filter chips." },
          { name: "key", type: "str", default: "None", description: "Streamlit widget key — pass one for stable reruns." },
        ]}
      />
      <DocP>
        Raises <InlineCode>ValueError</InlineCode> if <InlineCode>orientation</InlineCode> is not{" "}
        <InlineCode>&quot;vertical&quot;</InlineCode> or{" "}
        <InlineCode>&quot;horizontal&quot;</InlineCode>.
      </DocP>

      <DocH2>HeatmapResult</DocH2>
      <DocP>
        A <InlineCode>dict</InlineCode> subclass — the keys are also exposed as attributes:
      </DocP>
      <PropsTable
        rows={[
          { name: ".type", type: "str | None", description: "The selected heatmap type key." },
          { name: ".categories", type: "list[str]", description: "Selected category labels (empty = no filter)." },
          { name: ".indices", type: "list[int]", description: "Indices into your original data of matching rows." },
          { name: ".filter(data)", type: "method", description: "Returns only the matching rows. DataFrame in → DataFrame out; list in → list out." },
        ]}
      />
      <CodeBlock
        lang="python"
        code={`result = account_heatmap(df, config, key="hm")

filtered_df = result.filter(df)          # pandas-native filtering (uses .iloc)
if result.categories:
    st.info("Filtering on: " + ", ".join(result.categories))`}
      />
    </DocPage>
  )
}
