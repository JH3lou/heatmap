---
name: heatmap-usage
description: How to use the account-heatmap components — installing, choosing between HeatmapPanel / Heatmap+useHeatmap, writing the config (HeatmapConfig vs buildConfigFromRules), and the Streamlit component. Use when adding, wiring, or debugging an account-heatmap in a React, Next.js, Vite, or Streamlit app.
---

# Using the account-heatmap components

A filterable stacked-bar heatmap that sits next to a data table: click a
category to filter the rows. There are two distributions of the same component.

## Which package

| Package | Use when |
|---------|----------|
| `@jh3lou/account-heatmap` (npm) | Any React app — Next.js, Vite, CRA. |
| `streamlit-account-heatmap` (pip) | A Streamlit app; bidirectional, returns the selection to Python. |

## React: which API to reach for

**Default — `<HeatmapPanel />` (uncontrolled).** It owns the selection state
internally. Pass `data`, `config`, `initialType`, and read filtered rows via
`onFilter`. One tag, no wiring.

```tsx
import { HeatmapPanel } from "@jh3lou/account-heatmap"
import "@jh3lou/account-heatmap/styles.css"

<HeatmapPanel
  data={accounts}
  config={config}
  initialType="status"
  onFilter={({ filteredData, selectedType, selectedCategories }) => setRows(filteredData)}
/>
```

**Advanced — `<Heatmap />` + `useHeatmap` (controlled).** Reach for this only
when you must own the selection (sync it to the URL, share it across widgets).

```tsx
const { selectedType, selectedCategories, filteredData,
        handleCategoryClick, handleTypeChange, clearFilters } =
  useHeatmap({ data: accounts, config, initialType: "status" })

<Heatmap data={accounts} config={config}
  selectedType={selectedType} onTypeChange={handleTypeChange}
  selectedCategories={selectedCategories} onCategoryClick={handleCategoryClick}
  onClearFilters={clearFilters} />
```

Rule of thumb: **start with `HeatmapPanel`; drop to `Heatmap` + `useHeatmap`
only when you need the state.** Don't render `<Heatmap />` without wiring all
seven props — it is fully controlled and will not manage itself.

## Writing the config

The config maps a **type key** → `{ label, categories }`. Two ways to define
categories:

**1. `HeatmapConfig` — categories as a function** (full power, not
serializable). Each category returns `{ label, color, count, filter }`:

```ts
const config: HeatmapConfig = {
  status: {
    label: "Account Status",
    categories: (data) => [
      { label: "Active", color: "bg-green-600", count: data.filter(a => a.status === "Active").length, filter: a => a.status === "Active" },
    ],
  },
}
```

**2. `buildConfigFromRules` — declarative, JSON-serializable.** Use this when the
config crosses a boundary (an API response, a Python/Streamlit bridge) where you
can't ship functions:

```ts
import { buildConfigFromRules } from "@jh3lou/account-heatmap"

const config = buildConfigFromRules({
  cash: { label: "Cash Levels", categories: [
    { label: "HighCash", color: "bg-blue-600", rules: [{ field: "cashPercent", op: ">", value: 15 }] },
    { label: "Mid",      color: "bg-blue-400", rules: [{ field: "cashPercent", op: "between", value: [5, 15] }] },
  ]},
})
```

Operators: `>` `<` `>=` `<=` `==` `!=` `between` (`value` is `[min,max]`,
inclusive). Multiple `rules` on one category are AND-ed. Add `"abs": true` to
compare the absolute value of a numeric field (drift/variance).

## Key props

`title`, `orientation` (`"vertical"` sidebar | `"horizontal"` top bar),
`height` (vertical bar height, e.g. `"320px"`), `inline` (drop the card
wrapper), `showFilters` (active-filter chips), `filtersVariant`.

- **Vertical** for a sidebar next to a table.
- **Horizontal** for a bar above a table (adds a clickable legend).
- **`inline`** to embed inside your own card/dashboard tile — great for compact
  KPI cards; the label detail scales down with the bar height automatically.

## Streamlit

```python
from streamlit_account_heatmap import account_heatmap

result = account_heatmap(df, config, initial_type="cash", key="hm")
st.dataframe(result.filter(df))   # only matching rows
result.type, result.categories, result.indices
```

`config` is the **declarative** rules form (same schema as
`buildConfigFromRules`). The component follows Streamlit's own light/dark theme.

## Types worth importing

`HeatmapProps`, `HeatmapPanelProps`, `HeatmapFilterResult`, `HeatmapConfig`,
`HeatmapCategory`, `RulesConfig`, `RuleCategory`, `CategoryRule`, `RuleOperator`,
`UseHeatmapProps`. See [[heatmap-styling]] for theming and [[heatmap-testing]]
for automation.
