---
name: heatmap-styling
description: How to style and theme the account-heatmap — the two stylesheets (styles.css vs theme.css), Tailwind v4 setup, safelisting the runtime category colors, dark mode, and applying shadcn theme presets. Use when the component looks unstyled, colors are missing, dark mode is wrong, or you want to re-theme it.
---

# Styling the account-heatmap

The component is built on **shadcn/ui + Radix** primitives and **Tailwind v4**
design tokens. Styling has two parts: the base stylesheet, and the runtime
category colors.

## Pick one stylesheet

The package ships **two** — import exactly one.

**`styles.css` — batteries-included.** Use when you are *not* already running
Tailwind v4. It bundles Tailwind + Preflight (a global reset) + the design
tokens + the full color palette safelist.

```ts
import "@jh3lou/account-heatmap/styles.css"
```

Because it includes Preflight, import it **high in the tree**. In an app that
already has base styles, prefer `theme.css` instead to avoid double resets.

**`theme.css` — tokens only.** Use when you **already run Tailwind v4**. It has
just the light+dark design tokens, no Preflight:

```css
@import "tailwindcss";
@import "@jh3lou/account-heatmap/theme.css";
@source "./node_modules/@jh3lou/account-heatmap/dist/**/*.{js,cjs}";
```

## The gotcha: runtime category colors

Category colors (`"bg-blue-600"`, `"bg-green-500"`, …) come from your **config at
runtime**, so Tailwind's compiler never sees them as source and won't generate
them. Symptom: **bars render but are invisible / uncolored.**

- With `styles.css`: already handled — it safelists the whole palette.
- With `theme.css` (your own Tailwind build): **safelist the colors you use**:

```css
@source inline("bg-{blue,green,red,emerald,orange,yellow,gray}-{200,400,500,600}");
```

Add every `bg-*` shade your config references (or the whole palette).

## Dark mode

Dark tokens live under a `.dark` class (`@custom-variant dark (&:is(.dark *))`).
Put `class="dark"` on an ancestor (e.g. `<html>`), and the card, select and
chrome flip. Category colors are fixed data — they don't change with the theme.

- **Streamlit**: automatic — the component reads `theme.base` and applies `dark`
  to follow Streamlit's own theme.
- **React**: use your app's theme provider (e.g. `next-themes`) to toggle the
  `.dark` class.

## Re-theming with shadcn presets

The tokens are standard shadcn variables (`--primary`, `--background`,
`--card`, `--radius`, …). To restyle, drop a shadcn/tweakcn preset's
`:root { … }` / `.dark { … }` block into your global CSS. Because
`@theme inline` maps `--color-primary: var(--primary)` etc., overriding the raw
vars re-themes every utility (`bg-primary`, `text-foreground`, …).

To theme only a subtree, set the vars on a wrapper element instead of `:root`
(this is exactly what the demo's **Theme Playground** does — it rewrites `:root`
to a scoped `[data-theme-scope]` selector).

## Layout styling

`className` lands on the root. `inline` removes the card wrapper. In `inline`
vertical mode the label detail (two-line label → count-only) scales with the
bar's pixel height, so short KPI cards stay legible — don't fight it with fixed
font sizes.

See [[heatmap-usage]] for the API and [[heatmap-testing]] for automation hooks.
