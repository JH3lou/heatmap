import { DocPage, DocH2, DocP, InlineCode, Callout, PropsTable } from "@/components/docs/doc"
import { CodeBlock } from "@/components/docs/code-block"

export const metadata = { title: "Agents · Agent Skills — Account Heatmap Docs" }

export default function Page() {
  return (
    <DocPage
      title="Agent Skills"
      lead="The repo ships a Claude Code plugin — heatmap-devkit — whose skills teach coding agents how to use, style, and test these components."
    >
      <DocP>
        A <strong>skill</strong> is a small instruction package a coding agent loads when your
        request matches its description. Instead of the agent rediscovering the component&apos;s
        API from source every session, the skill hands it the distilled knowledge: which API to
        pick, the styling gotchas, and the automation locator contract. The skills live in{" "}
        <InlineCode>packages/heatmap-devkit-plugin</InlineCode> and cover both the React and the
        Streamlit package.
      </DocP>

      <DocH2>The skills</DocH2>
      <PropsTable
        labels={{ name: "Skill" }}
        rows={[
          {
            name: "heatmap-usage",
            description:
              "How to use the components: HeatmapPanel vs Heatmap+useHeatmap, HeatmapConfig vs buildConfigFromRules, the Streamlit API, and the exported types.",
          },
          {
            name: "heatmap-styling",
            description:
              "How to style them: styles.css vs theme.css, Tailwind v4 setup, safelisting runtime category colors, dark mode, shadcn preset re-theming.",
          },
          {
            name: "heatmap-testing",
            description:
              "How to drive them in automation: the stable data-slot / data-category / ARIA locators and ready-made Playwright snippets.",
          },
        ]}
      />

      <DocH2>Use them in this repo</DocH2>
      <DocP>
        Nothing to do — the skills are already active as <strong>project skills</strong> via
        symlinks in <InlineCode>.claude/skills/</InlineCode>. Any Claude Code session in this repo
        loads them automatically when a request matches (e.g. &quot;the bars are invisible&quot;
        triggers <InlineCode>heatmap-styling</InlineCode>), or you can invoke one explicitly with a
        slash command:
      </DocP>
      <CodeBlock lang="text" code={`/heatmap-usage
/heatmap-styling
/heatmap-testing`} />

      <DocH2>Install in another project</DocH2>
      <DocP>
        The repo doubles as a Claude Code <strong>plugin marketplace</strong> (see the root{" "}
        <InlineCode>.claude-plugin/marketplace.json</InlineCode>). From any other project:
      </DocP>
      <CodeBlock
        lang="text"
        code={`/plugin marketplace add JH3lou/heatmap
/plugin install heatmap-devkit`}
      />
      <DocP>Prefer not to install a plugin? Copy the skills in as project skills instead:</DocP>
      <CodeBlock
        lang="bash"
        code={`mkdir -p .claude/skills
cp -R path/to/heatmap/packages/heatmap-devkit-plugin/skills/* .claude/skills/`}
      />
      <Callout>
        Skills travel with the repo they&apos;re installed in — teammates who clone a project with{" "}
        <InlineCode>.claude/skills/</InlineCode> get them automatically, no per-user setup.
      </Callout>

      <DocH2>How triggering works</DocH2>
      <DocP>
        Each skill&apos;s frontmatter has a <InlineCode>description</InlineCode> that tells the
        agent <em>when</em> to load it. Descriptions are written to match real requests
        (&quot;add a heatmap&quot;, &quot;dark mode is wrong&quot;, &quot;write a Playwright test
        for the heatmap&quot;). If a skill isn&apos;t triggering, invoke it explicitly with its
        slash command — or sharpen its description.
      </DocP>

      <DocH2>Writing your own</DocH2>
      <DocP>
        A skill is a directory with a <InlineCode>SKILL.md</InlineCode>: YAML frontmatter
        (<InlineCode>name</InlineCode>, <InlineCode>description</InlineCode>) followed by the
        instructions. Keep the description specific about when to use it, and the body focused on
        decisions and gotchas rather than restating API docs — agents can read source; what they
        need is judgment:
      </DocP>
      <CodeBlock
        lang="markdown"
        code={`---
name: my-heatmap-skill
description: When to load this skill, written to match real user requests.
---

# My heatmap skill

The distilled guidance goes here...`}
      />
      <DocP>
        Pair skills with the component&apos;s{" "}
        <a className="underline" href="/docs/react/testing">automation locators</a> so agents can
        both <em>know</em> the API and <em>verify</em> their work in a real browser.
      </DocP>
    </DocPage>
  )
}
