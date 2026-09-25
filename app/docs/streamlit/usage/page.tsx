import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Streamlit · Usage — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Usage"
      lead="Feed it a DataFrame or list of dicts, react to the returned selection, and lay it out beside your table."
    >
      <DocH2>With a DataFrame</DocH2>
      <CodeBlock
        lang="python"
        code={`import pandas as pd
import streamlit as st
from streamlit_account_heatmap import account_heatmap

accounts = pd.DataFrame([...])          # your rows

result = account_heatmap(accounts, config, initial_type="cash", key="hm")

st.dataframe(result.filter(accounts))   # only the rows matching the selection
st.write(result.type, result.categories, result.indices)`}
      />
      <DocP>
        <InlineCode>data</InlineCode> accepts a pandas DataFrame or a list of dicts.{" "}
        <InlineCode>result.filter(data)</InlineCode> returns the same shape you passed in —
        DataFrame in, DataFrame out.
      </DocP>

      <DocH2>Side-by-side layout</DocH2>
      <CodeBlock
        lang="python"
        code={`left, right = st.columns([1, 3])

with left:
    result = account_heatmap(
        data=accounts,
        config=config,
        initial_type="cash",
        title="Account Heatmap",
        orientation="vertical",
        height="320px",
        key="account_heatmap",
    )

with right:
    filtered = result.filter(accounts)
    st.write(f"**{len(filtered)} of {len(accounts)} accounts**")
    st.dataframe(filtered, width="stretch", hide_index=True)

    if result.categories:
        st.info("Active filters: " + ", ".join(result.categories))`}
      />
      <Callout>
        Use <InlineCode>width=&quot;stretch&quot;</InlineCode> on{" "}
        <InlineCode>st.dataframe</InlineCode> — the old{" "}
        <InlineCode>use_container_width=True</InlineCode> is deprecated and will be removed after
        2025-12-31.
      </Callout>

      <DocH2>Reading the selection</DocH2>
      <DocP>
        The return value is a dict subclass with attribute access:{" "}
        <InlineCode>result.type</InlineCode> (active type key),{" "}
        <InlineCode>result.categories</InlineCode> (selected labels; empty = no filter), and{" "}
        <InlineCode>result.indices</InlineCode> (indices into your original data of matching
        rows). With no selection, <InlineCode>indices</InlineCode> covers all rows.
      </DocP>

      <DocH2>Widget key</DocH2>
      <DocP>
        Always pass a stable <InlineCode>key</InlineCode> when the surrounding script re-runs (it
        will), so Streamlit preserves the component instance and its selection across reruns.
      </DocP>
    </DocPage>
  )
}
