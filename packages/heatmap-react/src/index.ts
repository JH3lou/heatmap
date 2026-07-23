export { Heatmap } from "./heatmap"
export type { HeatmapProps, HeatmapConfig, HeatmapCategory } from "./heatmap"

export { useHeatmap } from "./use-heatmap"
export type { UseHeatmapProps } from "./use-heatmap"

export { ActiveFilters } from "./active-filters"
export type { ActiveFiltersProps } from "./active-filters"

export { buildConfigFromRules } from "./rules"
export type { RulesConfig, RuleCategory, CategoryRule, RuleOperator } from "./rules"

// The underlying shadcn/ui + Radix primitives are re-exported for advanced
// consumers who want to compose their own layouts with the same look-and-feel.
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./components/ui/card"
export { Button, buttonVariants } from "./components/ui/button"
export { Badge, badgeVariants } from "./components/ui/badge"
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"

export { cn } from "./lib/utils"
