import type { HeatmapConfig } from "./heatmap"

/**
 * Declarative, JSON-serializable configuration for the Heatmap.
 *
 * The core {@link HeatmapConfig} accepts arbitrary `filter` functions, which is
 * maximally flexible but cannot cross a serialization boundary (e.g. a Streamlit
 * / Python <-> JS bridge, or a config loaded from an API). `RulesConfig`
 * expresses the same categorization declaratively and is compiled into a
 * {@link HeatmapConfig} with {@link buildConfigFromRules}.
 */

export type RuleOperator = ">" | "<" | ">=" | "<=" | "==" | "!=" | "between"

export interface CategoryRule {
  /** The field on each data item to test. */
  field: string
  /** Comparison operator. */
  op: RuleOperator
  /** Comparison value. For `between`, provide a `[min, max]` tuple (inclusive). */
  value: number | string | boolean | [number, number]
  /** Apply Math.abs() to the field value before comparing (numeric fields only). */
  abs?: boolean
}

export interface RuleCategory {
  label: string
  /** Tailwind background color class, e.g. "bg-blue-600". */
  color: string
  /**
   * One or more rules. An item matches the category when *all* rules pass
   * (logical AND). Use multiple categories for OR-style grouping.
   */
  rules: CategoryRule[]
}

export interface RulesConfig {
  [type: string]: {
    label: string
    categories: RuleCategory[]
  }
}

function coerce(value: unknown): number | string | boolean | null {
  if (value === null || value === undefined) return null
  return value as number | string | boolean
}

function evaluateRule(item: Record<string, any>, rule: CategoryRule): boolean {
  const raw = coerce(item?.[rule.field])
  if (raw === null) return false

  let left: number | string | boolean = raw
  if (rule.abs && typeof left === "number") {
    left = Math.abs(left)
  }

  switch (rule.op) {
    case ">":
      return Number(left) > Number(rule.value)
    case "<":
      return Number(left) < Number(rule.value)
    case ">=":
      return Number(left) >= Number(rule.value)
    case "<=":
      return Number(left) <= Number(rule.value)
    case "==":
      return left === rule.value
    case "!=":
      return left !== rule.value
    case "between": {
      const [min, max] = rule.value as [number, number]
      const n = Number(left)
      return n >= min && n <= max
    }
    default:
      return false
  }
}

/**
 * Compile a declarative {@link RulesConfig} into a {@link HeatmapConfig} that the
 * {@link Heatmap} component and {@link useHeatmap} hook understand.
 */
export function buildConfigFromRules(rulesConfig: RulesConfig): HeatmapConfig {
  const config: HeatmapConfig = {}

  for (const [type, def] of Object.entries(rulesConfig)) {
    config[type] = {
      label: def.label,
      categories: (data: any[]) =>
        def.categories.map((category) => {
          const predicate = (item: any) => category.rules.every((rule) => evaluateRule(item, rule))
          return {
            label: category.label,
            color: category.color,
            count: data.filter(predicate).length,
            filter: predicate,
          }
        }),
    }
  }

  return config
}
