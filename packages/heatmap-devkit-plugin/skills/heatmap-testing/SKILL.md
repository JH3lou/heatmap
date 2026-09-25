---
name: heatmap-testing
description: How to drive and assert the account-heatmap in automation — the stable data-slot / data-category / aria locators, Playwright snippets for selecting types and toggling categories, and how to read the resulting filter state. Use when writing Playwright/agent automation or tests against a heatmap.
---

# Testing & automating the account-heatmap

The component ships **stable, semantic locators** (no `data-testid` naming — they
double as accessibility hooks) so agents and Playwright can drive it reliably.

## Locators

| Element | Locator | Extra attributes |
|---------|---------|------------------|
| Root | `[data-slot="heatmap"]` | `data-orientation`, `data-type` (active type key) |
| Type dropdown | `[data-slot="heatmap-type-select"]` | `aria-label="Select heatmap type"` |
| A bar segment | `[data-slot="heatmap-segment"]` | `data-category`, `data-selected`, `role="button"`, `aria-pressed`, `aria-label="<label>: <n> items (<pct>%)"` |
| Legend item (horizontal) | `[data-slot="heatmap-legend-item"]` | `data-category`, `data-selected`, `aria-pressed` |

Prefer **role + accessible name** where you can — segments and legend items are
`role="button"` with an `aria-label`, so `getByRole` works and they're
keyboard-activatable (Enter / Space).

## Playwright snippets

```ts
// Toggle a category by its data-category (stable across labels/pcts)
await page.locator('[data-slot="heatmap-segment"][data-category="Active"]').click()

// Or by accessible name
await page.getByRole('button', { name: /^Active:/ }).click()

// Assert a segment is selected
await expect(
  page.locator('[data-slot="heatmap-segment"][data-category="Active"]')
).toHaveAttribute('data-selected', 'true')

// Read the count a segment reports
const label = await page
  .locator('[data-slot="heatmap-segment"][data-category="Active"]')
  .getAttribute('aria-label')            // "Active: 5 items (50.0%)"

// Which type is showing?
const type = await page.locator('[data-slot="heatmap"]').getAttribute('data-type')
```

Changing the type is a Radix Select — open `[data-slot="heatmap-type-select"]`
and pick an option by its visible text (the option text is each type's `label`).

## Reading filter state programmatically

- **React `HeatmapPanel`**: assert on what `onFilter` reports
  (`filteredData`, `selectedType`, `selectedCategories`) rather than scraping
  the DOM — it's the source of truth.
- **Streamlit**: the call returns `result.type`, `result.categories`,
  `result.indices`; `result.filter(df)` gives the matching rows. Assert on those
  in Python.

## Snapshot / theming checks

The demo's **Theme Playground** exposes automation slots too:
`[data-slot="playground-base"][data-base="radix|base-ui|react-aria"]`,
`[data-slot="playground-preset"]`, `[data-slot="playground-css"]`,
`[data-slot="playground-dark-toggle"]`, and
`[data-slot="playground-preview"]` (the scoped preview root) — useful for
visual-regression across presets and base libraries.

See [[heatmap-usage]] for the API and [[heatmap-styling]] for theming.
