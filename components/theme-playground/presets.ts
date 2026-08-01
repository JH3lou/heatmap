/**
 * Starter shadcn theme presets. Each value is the raw CSS variable block you
 * would paste from the shadcn theme editor / tweakcn — a `:root { ... }` for
 * light and a `.dark { ... }` for dark. The playground scopes these to the
 * preview, so `:root` and `.dark` here are rewritten to the preview scope.
 */

export interface ThemePreset {
  id: string
  name: string
  css: string
}

const NEUTRAL = `:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}`

const VIOLET = `:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.21 0.03 264);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.21 0.03 264);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.21 0.03 264);
  --primary: oklch(0.55 0.24 293);
  --primary-foreground: oklch(0.98 0.01 293);
  --secondary: oklch(0.96 0.02 293);
  --secondary-foreground: oklch(0.35 0.12 293);
  --muted: oklch(0.97 0.01 293);
  --muted-foreground: oklch(0.55 0.03 293);
  --accent: oklch(0.94 0.04 293);
  --accent-foreground: oklch(0.35 0.12 293);
  --destructive: oklch(0.58 0.24 27);
  --border: oklch(0.91 0.02 293);
  --input: oklch(0.91 0.02 293);
  --ring: oklch(0.55 0.24 293);
}
.dark {
  --background: oklch(0.19 0.02 293);
  --foreground: oklch(0.98 0.01 293);
  --card: oklch(0.24 0.03 293);
  --card-foreground: oklch(0.98 0.01 293);
  --popover: oklch(0.24 0.03 293);
  --popover-foreground: oklch(0.98 0.01 293);
  --primary: oklch(0.7 0.19 293);
  --primary-foreground: oklch(0.19 0.02 293);
  --secondary: oklch(0.31 0.04 293);
  --secondary-foreground: oklch(0.98 0.01 293);
  --muted: oklch(0.31 0.04 293);
  --muted-foreground: oklch(0.72 0.03 293);
  --accent: oklch(0.35 0.06 293);
  --accent-foreground: oklch(0.98 0.01 293);
  --destructive: oklch(0.7 0.19 22);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.7 0.19 293);
}`

const EMERALD = `:root {
  --radius: 0.75rem;
  --background: oklch(0.99 0.01 160);
  --foreground: oklch(0.24 0.05 160);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.24 0.05 160);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.24 0.05 160);
  --primary: oklch(0.6 0.14 163);
  --primary-foreground: oklch(0.98 0.02 163);
  --secondary: oklch(0.95 0.03 163);
  --secondary-foreground: oklch(0.36 0.08 163);
  --muted: oklch(0.96 0.02 163);
  --muted-foreground: oklch(0.52 0.04 163);
  --accent: oklch(0.92 0.06 163);
  --accent-foreground: oklch(0.36 0.08 163);
  --destructive: oklch(0.58 0.24 27);
  --border: oklch(0.9 0.03 163);
  --input: oklch(0.9 0.03 163);
  --ring: oklch(0.6 0.14 163);
}
.dark {
  --background: oklch(0.2 0.03 163);
  --foreground: oklch(0.96 0.02 163);
  --card: oklch(0.25 0.04 163);
  --card-foreground: oklch(0.96 0.02 163);
  --popover: oklch(0.25 0.04 163);
  --popover-foreground: oklch(0.96 0.02 163);
  --primary: oklch(0.72 0.16 163);
  --primary-foreground: oklch(0.2 0.03 163);
  --secondary: oklch(0.31 0.05 163);
  --secondary-foreground: oklch(0.96 0.02 163);
  --muted: oklch(0.31 0.05 163);
  --muted-foreground: oklch(0.74 0.04 163);
  --accent: oklch(0.36 0.07 163);
  --accent-foreground: oklch(0.96 0.02 163);
  --destructive: oklch(0.7 0.19 22);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.72 0.16 163);
}`

export const THEME_PRESETS: ThemePreset[] = [
  { id: "neutral", name: "Neutral (shadcn default)", css: NEUTRAL },
  { id: "violet", name: "Violet", css: VIOLET },
  { id: "emerald", name: "Emerald", css: EMERALD },
]
