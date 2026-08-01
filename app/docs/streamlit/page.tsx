import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Streamlit · Introduction — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Introduction"
      lead="The same heatmap as a bidirectional Streamlit component: render it over your rows, click categories to filter, and read the selection back in Python."
    >
      <DocP>
        <InlineCode>streamlit-account-heatmap</InlineCode> wraps the React component as a Streamlit
        custom component. Clicks flow back to Python as a{" "}
        <InlineCode>HeatmapResult</InlineCode> with the selected type, categories, and matching row
        indices — so a click on the heatmap can filter a{" "}
        <InlineCode>st.dataframe</InlineCode> beside it.
      </DocP>

      <DocH2>Installation</DocH2>
      <CodeBlock lang="bash" code={`pip install streamlit-account-heatmap`} />
      <Callout>
        The wheel includes the compiled frontend. Package users do <strong>not</strong> need
        Node.js, npm, React, or any other JavaScript tooling.
      </Callout>

      <DocH2>Hello heatmap</DocH2>
      <CodeBlock
        lang="python"
        code={`import streamlit as st
from streamlit_account_heatmap import account_heatmap

accounts = [
    {"name": "Johnson Trust", "cashPercent": 15.2, "status": "Active"},
    {"name": "Miller Family", "cashPercent": 3.8,  "status": "Pending"},
]

config = {
    "status": {
        "label": "Account Status",
        "categories": [
            {"label": "Active",  "color": "bg-green-600",
             "rules": [{"field": "status", "op": "==", "value": "Active"}]},
            {"label": "Pending", "color": "bg-yellow-600",
             "rules": [{"field": "status", "op": "==", "value": "Pending"}]},
        ],
    },
}

result = account_heatmap(accounts, config, key="hm")
st.write(result.type, result.categories, result.indices)`}
      />
      <DocP>
        Continue with <a className="underline" href="/docs/streamlit/usage">Usage</a> for the
        DataFrame workflow and layout patterns.
      </DocP>

      <DocH2>Theming</DocH2>
      <DocP>
        The component follows Streamlit&apos;s own light/dark theme automatically — it reads the
        active theme and applies the dark design tokens, so it blends into a dark app with no
        configuration.
      </DocP>
    </DocPage>
  )
}
