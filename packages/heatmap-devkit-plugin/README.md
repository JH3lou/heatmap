# heatmap-devkit (Claude Code plugin)

A small set of Claude Code **skills** that help you build with the account-heatmap
components — the React package [`@jh3lou/account-heatmap`](../heatmap-react) and the
Streamlit component [`streamlit-account-heatmap`](../streamlit-heatmap).

## Skills

| Skill | Covers |
|-------|--------|
| `heatmap-usage` | How to use them, the types available, and when to reach for `HeatmapPanel` vs `Heatmap` + `useHeatmap`, `HeatmapConfig` vs `buildConfigFromRules`, and the Streamlit API. |
| `heatmap-styling` | How to style them — `styles.css` vs `theme.css`, Tailwind v4 setup, safelisting runtime category colors, dark mode, and shadcn preset re-theming. |
| `heatmap-testing` | How to test/automate them — the stable `data-slot` / `data-category` / ARIA locators and Playwright snippets. |

Each skill loads automatically when your request matches its description (e.g.
"add a heatmap", "the bars are invisible", "write a Playwright test for the
heatmap"), or you can invoke one explicitly.

## Use it in this repo

The skills are auto-discovered as **project skills** if placed under
`.claude/skills/`. From the repo root:

```bash
mkdir -p .claude/skills
ln -s ../../packages/heatmap-devkit-plugin/skills/heatmap-usage   .claude/skills/heatmap-usage
ln -s ../../packages/heatmap-devkit-plugin/skills/heatmap-styling .claude/skills/heatmap-styling
ln -s ../../packages/heatmap-devkit-plugin/skills/heatmap-testing .claude/skills/heatmap-testing
```

## Use it in another project (as a plugin)

Add this repo as a plugin marketplace, then install:

```
/plugin marketplace add JH3lou/heatmap
/plugin install heatmap-devkit
```

(Or copy the `skills/` folders into that project's `.claude/skills/`.)

## License

MIT © [Justin Helou](https://github.com/JH3lou)
