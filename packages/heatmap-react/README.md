# @jh3lou/account-heatmap

Interactive, filterable **stacked-bar heatmap** for React. Drop it next to any
data table to get click-to-filter category visualizations with support for
vertical (sidebar) and horizontal (top-bar) orientations, an inline (no card)
mode, and active-filter chips.

> Authored by [Justin Helou](https://github.com/JH3lou). MIT licensed.

## Install

```bash
npm install @jh3lou/account-heatmap
```

`react` and `react-dom` (>=18) are peer dependencies.

## Styling

The package ships a **self-contained stylesheet** so it works with or without
Tailwind in your app. Import it once (e.g. in your root layout / entry):

```ts
import "@jh3lou/account-heatmap/styles.css"
```

The stylesheet ships **without** Tailwind Preflight, so it will not reset your
app's base styles. If you already use Tailwind and prefer your own build to
generate the classes, add the package to your `content` globs instead of
importing the CSS:

```js
// tailwind.config.js
content: [
  "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}",
  // ...your app
]
```

Category colors come from your config at runtime (e.g. `"bg-blue-600"`); the
shipped stylesheet safelists the full standard Tailwind color palette so any
`bg-*` you pass renders correctly.

## Quick start

```tsx
import { Heatmap, useHeatmap, type HeatmapConfig } from "@jh3lou/account-heatmap"
import "@jh3lou/account-heatmap/styles.css"

interface Account {
  id: number
  name: string
  cashPercent: number
  status: string
}

const config: HeatmapConfig = {
  status: {
    label: "Account Status",
    categories: (data: Account[]) => [
      { label: "Active",  color: "bg-green-600",  count: data.filter(a => a.status === "Active").length,  filter: a => a.status === "Active" },
      { label: "Pending", color: "bg-yellow-600", count: data.filter(a => a.status === "Pending").length, filter: a => a.status === "Pending" },
      { label: "Closed",  color: "bg-gray-600",   count: data.filter(a => a.status === "Closed").length,  filter: a => a.status === "Closed" },
    ],
  },
}

export function Dashboard({ accounts }: { accounts: Account[] }) {
  const {
    selectedType, selectedCategories, filteredData,
    handleCategoryClick, handleTypeChange, clearFilters,
  } = useHeatmap({ data: accounts, config, initialType: "status" })

  return (
    <div className="grid grid-cols-4 gap-6">
      <Heatmap
        className="col-span-1"
        data={accounts}
        config={config}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedCategories={selectedCategories}
        onCategoryClick={handleCategoryClick}
        onClearFilters={clearFilters}
        title="Accounts"
        orientation="vertical"
      />
      <table className="col-span-3">
        {/* render filteredData */}
      </table>
    </div>
  )
}
```

## Declarative config (JSON-serializable)

When your config must cross a serialization boundary (an API response, or a
Python/Streamlit bridge) you can't ship `filter` functions. Use
`buildConfigFromRules` to describe categories declaratively and compile them:

```ts
import { buildConfigFromRules } from "@jh3lou/account-heatmap"

const config = buildConfigFromRules({
  cash: {
    label: "Cash Levels",
    categories: [
      { label: "HighCash",   color: "bg-blue-600", rules: [{ field: "cashPercent", op: ">", value: 15 }] },
      { label: "MediumCash", color: "bg-blue-400", rules: [{ field: "cashPercent", op: "between", value: [5, 15] }] },
      { label: "LowCash",    color: "bg-blue-200", rules: [{ field: "cashPercent", op: "<", value: 5 }] },
    ],
  },
  drift: {
    label: "Drift Analysis",
    categories: [
      // `abs: true` compares the absolute value of the field
      { label: "HighDrift", color: "bg-red-600", rules: [{ field: "driftPercent", op: ">", value: 3, abs: true }] },
    ],
  },
})
```

Supported operators: `>`, `<`, `>=`, `<=`, `==`, `!=`, `between` (`value` is
`[min, max]`, inclusive). Multiple rules on one category are AND-ed together.

## API

### `<Heatmap />` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | — | Items to visualize. |
| `config` | `HeatmapConfig` | — | Heatmap types and their categories. |
| `selectedType` | `string` | — | Active heatmap type key. |
| `onTypeChange` | `(type: string) => void` | — | Type-change handler. |
| `selectedCategories` | `string[]` | — | Currently selected category labels. |
| `onCategoryClick` | `(category: string) => void` | — | Category toggle handler. |
| `onClearFilters` | `() => void` | — | Clear-all handler. |
| `title` | `string` | `"Heatmap"` | Optional heading. |
| `className` | `string` | `""` | Extra classes on the root. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout orientation. |
| `height` | `string` | `"320px"` | Bar height (vertical only). |
| `inline` | `boolean` | `false` | Remove the card wrapper for embedding. |
| `showFilters` | `boolean` | `true` | Show the active-filters chips. |
| `filtersVariant` | `"default" \| "compact" \| "inline"` | `"default"` | Filter chip layout. |

### `useHeatmap({ data, config, initialType })`

Returns `{ selectedType, selectedCategories, heatmapCategories, filteredData,
handleCategoryClick, handleTypeChange, clearFilters }` — everything needed to
drive `<Heatmap />` and filter your table.

### Also exported

`ActiveFilters`, `buildConfigFromRules`, and the styled primitives `Card`,
`CardContent`, `Button`, `Badge` for composing custom layouts.

## Using this from Streamlit

A ready-to-use Streamlit v2 component built on top of this package lives in
[`packages/streamlit-heatmap`](../streamlit-heatmap). See its README for the
Python API.

## Build

```bash
npm install
npm run build   # emits dist/index.js, dist/index.cjs, dist/index.d.ts, dist/styles.css
```

## License

MIT © [Justin Helou](https://github.com/JH3lou)
