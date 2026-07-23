export { Heatmap } from "./heatmap"
export type { HeatmapProps, HeatmapConfig, HeatmapCategory } from "./heatmap"

export { useHeatmap } from "./use-heatmap"
export type { UseHeatmapProps } from "./use-heatmap"

export { ActiveFilters } from "./active-filters"
export type { ActiveFiltersProps } from "./active-filters"

export { buildConfigFromRules } from "./rules"
export type { RulesConfig, RuleCategory, CategoryRule, RuleOperator } from "./rules"

// Primitives are exported for advanced consumers who want to compose their own
// layouts with the same look-and-feel.
export { Card, CardContent, Button, Badge } from "./primitives"
export type { ButtonProps, BadgeProps } from "./primitives"
