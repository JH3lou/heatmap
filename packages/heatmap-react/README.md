# @jh3lou/account-heatmap

Interactive, filterable **stacked-bar heatmap** for React. Drop it next to any
data table to get click-to-filter category visualizations with support for
vertical (sidebar) and horizontal (top-bar) orientations, an inline (no card)
mode, and active-filter chips.

Built on **shadcn/ui + Radix** primitives (`Card`, `Badge`, `Button`, and a
Radix `Select`) and styled with **Tailwind v4** design tokens — the exact
components and tokens from the source app, so it renders identically.

> Authored by [Justin Helou](https://github.com/JH3lou). MIT licensed.

## Install

```bash
npm install @jh3lou/account-heatmap
```

`react` and `react-dom` (>=18) are peer dependencies. The Radix/shadcn
primitives it uses (`@radix-ui/react-select`, `@radix-ui/react-slot`,
`class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`) are
regular dependencies and installed for you.

## Styling

The package ships **two** stylesheets. Pick one:

**1. Not using Tailwind (or want it to "just work") — import the full stylesheet:**

```ts
import "@jh3lou/account-heatmap/styles.css"
```

This is a batteries-included Tailwind v4 build: Preflight + the design tokens +
the Radix `Select` animations + a safelist of the full color palette (so any
`bg-*` category color you pass at runtime renders). Because it includes
Preflight (a global CSS reset), import it high in your tree; in an app that
already has its own base styles, prefer option 2.

**2. Already using Tailwind v4 — import the tokens and add the package to your sources:**

```css
/* your app's Tailwind entry CSS */
@import "tailwindcss";
@import "@jh3lou/account-heatmap/theme.css";     /* design tokens, no Preflight */
@source "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}";
```

`theme.css` contains only the design tokens (light + dark) — no Preflight — so
it won't touch your base styles. Your own Tailwind build generates the utility
classes. Category colors come from your config at runtime (e.g. `"bg-blue-600"`);
safelist them (or the whole palette) so they're generated.

## Quick start

The simplest path is `<HeatmapPanel />` — an uncontrolled wrapper that owns its
own selection state. Pass `data`, `config`, and `initialType`, and read the
filtered rows back through `onFilter`:

```tsx
import { HeatmapPanel, type HeatmapConfig } from "@jh3lou/account-heatmap"
import "@jh3lou/account-heatmap/styles.css"
import { useState } from "react"

export function Dashboard({ accounts }: { accounts: Account[] }) {
  const [rows, setRows] = useState(accounts)

  return (
    <div className="grid grid-cols-4 gap-6">
      <HeatmapPanel
        className="col-span-1"
        data={accounts}
        config={config}          // see "Declarative config" below
        initialType="status"
        title="Accounts"
        onFilter={({ filteredData }) => setRows(filteredData)}
      />
      <table className="col-span-3">{/* render rows */}</table>
    </div>
  )
}
```

`onFilter` fires on mount and whenever the selection changes, with
`{ filteredData, selectedType, selectedCategories }`.

### Controlled usage (advanced)

Reach for `<Heatmap />` + `useHeatmap` directly when you need to own the
selection state yourself — e.g. to sync it to the URL or share it across widgets:

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

### `<HeatmapPanel />` props

The uncontrolled wrapper. Takes `data`, `config`, `initialType`, an optional
`onFilter` callback, and the same presentation props as `<Heatmap />` (`title`,
`className`, `orientation`, `height`, `inline`, `showFilters`, `filtersVariant`).
It manages the selection internally, so you don't pass `selectedType` /
`selectedCategories` / the handlers.

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

`HeatmapPanel`, `ActiveFilters`, `buildConfigFromRules`, the `cn` class-merge helper, and the
underlying shadcn/ui + Radix primitives (`Card`/`CardContent`/…, `Button`,
`Badge`, `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`/…) for composing
custom layouts with the same look-and-feel.

## Using this from Streamlit

A ready-to-use Streamlit v2 component built on top of this package lives in
[`packages/streamlit-heatmap`](../streamlit-heatmap). See its README for the
Python API.

## Build

```bash
npm install
npm run build   # emits dist/index.{js,cjs,d.ts}, dist/styles.css, dist/theme.css
```

## License

MIT © [Justin Helou](https://github.com/JH3lou)
