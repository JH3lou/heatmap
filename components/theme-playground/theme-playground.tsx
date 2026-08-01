"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heatmap } from "@/components/heatmap"
import { useHeatmap } from "@/hooks/use-heatmap"
import { accountHeatmapConfig, type Account } from "@/config/account-heatmap-config"
import { cn } from "@/lib/utils"
import { PRIMITIVE_SETS, BASE_ORDER, type BaseId } from "./primitives"
import { THEME_PRESETS } from "./presets"
import { FrameworkSnippets } from "./framework-snippets"

const SAMPLE: Account[] = [
  { id: 1, name: "Johnson Trust", accountNumber: "ACC001", totalValue: 1250000, cashPercent: 15.2, driftPercent: 2.1, restrictions: "None", status: "Active", advisor: "Smith, John" },
  { id: 2, name: "Miller Family", accountNumber: "ACC002", totalValue: 850000, cashPercent: 3.8, driftPercent: -1.2, restrictions: "Tax Loss", status: "Pending", advisor: "Johnson, Mary" },
  { id: 3, name: "Davis Corp", accountNumber: "ACC003", totalValue: 2100000, cashPercent: 22.5, driftPercent: 4.8, restrictions: "ESG Only", status: "Active", advisor: "Brown, David" },
  { id: 4, name: "Wilson Retirement", accountNumber: "ACC004", totalValue: 450000, cashPercent: 1.2, driftPercent: 0.5, restrictions: "None", status: "On Hold", advisor: "Smith, John" },
  { id: 5, name: "Taylor Holdings", accountNumber: "ACC005", totalValue: 1800000, cashPercent: 8.7, driftPercent: -2.8, restrictions: "No Options", status: "Active", advisor: "Johnson, Mary" },
  { id: 6, name: "Anderson LLC", accountNumber: "ACC006", totalValue: 950000, cashPercent: 18.9, driftPercent: 3.2, restrictions: "None", status: "Closed", advisor: "Brown, David" },
]

const SCOPE_ATTR = "data-theme-scope"

/** Rewrite a pasted shadcn theme block so its vars apply only to the preview. */
function scopeCss(css: string): string {
  return css
    .replace(/:root\b/g, `[${SCOPE_ATTR}]`)
    .replace(/\.dark\b/g, `[${SCOPE_ATTR}].dark`)
}

export function ThemePlayground() {
  const [presetId, setPresetId] = React.useState(THEME_PRESETS[0].id)
  const [css, setCss] = React.useState(THEME_PRESETS[0].css)
  const [base, setBase] = React.useState<BaseId>("radix")
  const [dark, setDark] = React.useState(false)

  const scoped = React.useMemo(() => scopeCss(css), [css])

  const { selectedType, selectedCategories, handleCategoryClick, handleTypeChange, clearFilters } =
    useHeatmap({ data: SAMPLE, config: accountHeatmapConfig, initialType: "status" })

  const set = PRIMITIVE_SETS[base]
  const typeOptions = Object.entries(accountHeatmapConfig).map(([value, v]) => ({ value, label: v.label }))

  const applyPreset = (id: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === id)
    if (preset) {
      setPresetId(id)
      setCss(preset.css)
    }
  }

  return (
    <div className="space-y-6" data-slot="theme-playground">
      {/* Scoped theme — only elements under [data-theme-scope] pick these up */}
      <style dangerouslySetInnerHTML={{ __html: scoped }} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ---- Controls ---- */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Theme Playground</CardTitle>
            <p className="text-sm text-gray-600">
              Paste a shadcn preset (the <code>:root</code> / <code>.dark</code> CSS variables) and see the
              components restyle live. Switch the base primitive library to prove the look is base-agnostic.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Preset picker */}
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="tp-preset" className="text-sm font-medium">
                Preset
              </label>
              <select
                id="tp-preset"
                data-slot="playground-preset"
                aria-label="Theme preset"
                value={presetId}
                onChange={(e) => applyPreset(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                {THEME_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CSS variables editor */}
            <div className="space-y-1">
              <label htmlFor="tp-css" className="text-sm font-medium">
                Theme CSS variables
              </label>
              <textarea
                id="tp-css"
                data-slot="playground-css"
                aria-label="Theme CSS variables"
                spellCheck={false}
                value={css}
                onChange={(e) => {
                  setCss(e.target.value)
                  setPresetId("custom")
                }}
                className="h-64 w-full resize-y rounded-md border border-input bg-muted/30 p-3 font-mono text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Base library switcher */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Base primitive library</span>
              <div className="flex gap-2" role="radiogroup" aria-label="Base primitive library">
                {BASE_ORDER.map((id) => {
                  const s = PRIMITIVE_SETS[id]
                  const active = id === base
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      data-slot="playground-base"
                      data-base={id}
                      onClick={() => setBase(id)}
                      className={cn(
                        "flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {s.name}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Rendering with <code>{set.pkg}</code>.{" "}
                <a href={set.docsUrl} target="_blank" rel="noreferrer" className="underline">
                  Docs
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---- Live preview (scoped) ---- */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Preview</CardTitle>
            <button
              type="button"
              data-slot="playground-dark-toggle"
              aria-label="Toggle preview dark mode"
              aria-pressed={dark}
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent"
            >
              {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {dark ? "Dark" : "Light"}
            </button>
          </CardHeader>
          <CardContent>
            <div
              {...{ [SCOPE_ATTR]: "" }}
              data-slot="playground-preview"
              className={cn("rounded-lg border bg-background p-5 text-foreground", dark && "dark")}
            >
              <div className="space-y-5">
                {/* Buttons rendered by the selected base library */}
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Buttons · {set.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <set.Button variant="default" data-slot="preview-button">Primary</set.Button>
                    <set.Button variant="secondary">Secondary</set.Button>
                    <set.Button variant="outline">Outline</set.Button>
                    <set.Button variant="destructive">Destructive</set.Button>
                    <set.Button variant="ghost">Ghost</set.Button>
                  </div>
                </div>

                {/* Badges (presentational, shared) */}
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Select (selected base) driving the heatmap type */}
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Select · {set.name} — drives the heatmap below
                  </p>
                  <set.Select
                    value={selectedType}
                    onValueChange={handleTypeChange}
                    options={typeOptions}
                    aria-label="Heatmap type (playground)"
                  />
                </div>

                {/* The actual Heatmap component, themed by the scoped vars */}
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Heatmap</p>
                  <Heatmap
                    data={SAMPLE}
                    config={accountHeatmapConfig}
                    selectedType={selectedType}
                    onTypeChange={handleTypeChange}
                    selectedCategories={selectedCategories}
                    onCategoryClick={handleCategoryClick}
                    onClearFilters={clearFilters}
                    orientation="horizontal"
                    height="64px"
                    inline
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---- Framework setup ---- */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Use it in your stack</CardTitle>
          <p className="text-sm text-gray-600">
            The same component, wired for each toolchain.
          </p>
        </CardHeader>
        <CardContent>
          <FrameworkSnippets />
        </CardContent>
      </Card>
    </div>
  )
}
