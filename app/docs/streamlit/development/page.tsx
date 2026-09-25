import { DocPage, DocH2, DocP, InlineCode, Callout } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Streamlit · Development — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Development"
      lead="Rebuilding the frontend, iterating live against a dev server, and packaging the wheel."
    >
      <DocP>
        The frontend is a Vite + React + TypeScript app that reuses the React package source
        directly (via a Vite alias), so there is a single source of truth. The JavaScript
        toolchain is only needed when developing or rebuilding the frontend — never for package
        users.
      </DocP>

      <DocH2>Rebuild the frontend</DocH2>
      <CodeBlock
        lang="bash"
        code={`cd streamlit_account_heatmap/frontend
npm install
npm run build          # emits streamlit_account_heatmap/frontend/build`}
      />
      <Callout variant="warning">
        The Python package serves the <strong>committed</strong>{" "}
        <InlineCode>frontend/build</InlineCode> directory. If you change any frontend source
        (including the shared React package it aliases), you must rebuild — otherwise your change
        will not appear in Streamlit.
      </Callout>

      <DocH2>Iterate live</DocH2>
      <DocP>
        Set <InlineCode>_RELEASE = False</InlineCode> in{" "}
        <InlineCode>streamlit_account_heatmap/__init__.py</InlineCode> and run the dev server; the
        component then loads from <InlineCode>http://localhost:3001</InlineCode> with hot reload:
      </DocP>
      <CodeBlock
        lang="bash"
        code={`# terminal 1
cd streamlit_account_heatmap/frontend && npm run dev    # serves on :3001

# terminal 2
pip install -e ".[example]"
streamlit run example.py`}
      />
      <DocP>
        Flip <InlineCode>_RELEASE</InlineCode> back to <InlineCode>True</InlineCode> (and rebuild)
        before packaging.
      </DocP>

      <DocH2>Build the distribution</DocH2>
      <CodeBlock
        lang="bash"
        code={`python -m build        # produces wheel + sdist under dist/`}
      />
      <DocP>
        The wheel bundles <InlineCode>frontend/build</InlineCode> via package data, so a plain{" "}
        <InlineCode>pip install</InlineCode> ships the compiled UI.
      </DocP>
    </DocPage>
  )
}
