import { useMemo } from "react"
import { Card, CardContent } from "./primitives"
import { ActiveFilters } from "./active-filters"
import { cn } from "./lib/utils"

export interface HeatmapCategory {
  label: string
  count: number
  color: string
  filter: (item: any) => boolean
}

export interface HeatmapConfig {
  [key: string]: {
    label: string
    categories: (data: any[]) => HeatmapCategory[]
  }
}

export interface HeatmapProps {
  data: any[]
  config: HeatmapConfig
  selectedType: string
  onTypeChange: (type: string) => void
  selectedCategories: string[]
  onCategoryClick: (category: string) => void
  onClearFilters: () => void
  title?: string
  className?: string
  orientation?: "vertical" | "horizontal"
  height?: string
  inline?: boolean
  showFilters?: boolean
  filtersVariant?: "default" | "compact" | "inline"
}

export function Heatmap({
  data,
  config,
  selectedType,
  onTypeChange,
  selectedCategories,
  onCategoryClick,
  onClearFilters,
  title = "Heatmap",
  className = "",
  orientation = "vertical",
  height = "320px",
  inline = false,
  showFilters = true,
  filtersVariant = "default",
}: HeatmapProps) {
  // Generate categories based on current type and data
  const heatmapCategories = useMemo((): HeatmapCategory[] => {
    const typeConfig = config[selectedType]
    if (!typeConfig) return []
    return typeConfig.categories(data)
  }, [selectedType, data, config])

  const heatmapContent = (
    <div className="space-y-4">
      {/* Header section - only show if not inline or if title/controls are needed */}
      {(!inline || title || selectedType) && (
        <div
          className={cn(
            "flex gap-3",
            orientation === "horizontal" ? "flex-row items-center justify-between" : "flex-col",
            inline ? "mb-4" : "",
          )}
        >
          {title && <h3 className={cn("text-lg font-semibold", inline ? "text-base" : "")}>{title}</h3>}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className={cn(
              "flex h-9 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400",
              orientation === "horizontal" ? "w-48" : "w-full",
              inline ? "text-sm" : "",
            )}
          >
            {Object.entries(config).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stacked Bar Chart */}
      <div className="space-y-2">
        <div
          className={cn(
            orientation === "horizontal" ? "flex flex-row h-16" : "flex flex-col",
            "rounded-lg overflow-hidden border border-gray-200",
          )}
          style={{ height: orientation === "horizontal" ? "64px" : height }}
        >
          {heatmapCategories.map((category) => {
            const totalItems = data.length
            const percentage = totalItems > 0 ? (category.count / totalItems) * 100 : 0
            const isSelected = selectedCategories.includes(category.label)

            // Don't render sections with 0 items
            if (category.count === 0) return null

            const sizeStyle =
              orientation === "horizontal"
                ? { width: `${Math.max(percentage, 8)}%` }
                : { height: `${Math.max(percentage, 8)}%` }

            return (
              <div
                key={category.label}
                className={cn(
                  category.color,
                  "cursor-pointer transition-all hover:opacity-80 flex items-center justify-center text-white font-medium text-sm relative",
                  isSelected ? "ring-2 ring-blue-500 ring-inset" : "",
                )}
                style={sizeStyle}
                onClick={() => onCategoryClick(category.label)}
                title={`${category.label}: ${category.count} items (${percentage.toFixed(1)}%)`}
              >
                {/* Content based on size and orientation */}
                {orientation === "horizontal" ? (
                  // Horizontal layout
                  <>
                    {percentage > 25 && (
                      <div className="text-center px-2">
                        <div className="font-semibold text-sm">{category.label}</div>
                        <div className="text-xs font-bold">({category.count})</div>
                      </div>
                    )}
                    {percentage <= 25 && percentage > 15 && (
                      <div className="text-center px-1">
                        <div className="font-bold text-xs">({category.count})</div>
                      </div>
                    )}
                    {percentage <= 15 && (
                      <div className="text-center px-1">
                        <div className="font-bold text-xs">{category.count}</div>
                      </div>
                    )}
                  </>
                ) : (
                  // Vertical layout
                  <>
                    {percentage > 20 && (
                      <div className="text-center px-2">
                        <div className="font-semibold text-base">{category.label}</div>
                        <div className="text-lg font-bold">({category.count})</div>
                      </div>
                    )}
                    {percentage <= 20 && percentage > 10 && (
                      <div className="text-center px-2">
                        <div className="font-bold text-lg">({category.count})</div>
                      </div>
                    )}
                    {percentage <= 10 && (
                      <div className="text-center px-2">
                        <div className="font-bold text-sm">{category.count}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend for horizontal orientation */}
      {orientation === "horizontal" && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {heatmapCategories.map((category) => {
            if (category.count === 0) return null
            const isSelected = selectedCategories.includes(category.label)

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => onCategoryClick(category.label)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded text-xs transition-all hover:opacity-80",
                  isSelected ? "ring-2 ring-blue-500" : "",
                )}
              >
                <div className={cn("w-3 h-3 rounded", category.color)}></div>
                <span className="text-gray-700 font-medium">{category.label}</span>
                <span className="text-gray-500">({category.count})</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Active Filters */}
      {showFilters && (
        <ActiveFilters
          selectedCategories={selectedCategories}
          onClearFilters={onClearFilters}
          onRemoveFilter={onCategoryClick}
          variant={filtersVariant}
        />
      )}
    </div>
  )

  // Conditional rendering based on inline prop
  if (inline) {
    return <div className={className}>{heatmapContent}</div>
  }

  return (
    <Card className={className}>
      <CardContent>{heatmapContent}</CardContent>
    </Card>
  )
}
