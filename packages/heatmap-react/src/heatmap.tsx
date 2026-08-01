"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { ActiveFilters } from "./active-filters"

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
  orientation?: "vertical" | "horizontal" | "inline" | "side-by-side" | "drawer" | "resizable" | "enhanced-drawer" | "sortable"
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
          className={`flex ${orientation === "horizontal" ? "flex-row items-center justify-between" : "flex-col"} gap-3 ${inline ? "mb-4" : ""}`}
        >
          {title && <h3 className={`text-lg font-semibold ${inline ? "text-base" : ""}`}>{title}</h3>}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger
              data-slot="heatmap-type-select"
              aria-label="Select heatmap type"
              className={`${orientation === "horizontal" ? "w-48" : "w-full"} ${inline ? "text-sm" : ""}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(config).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Stacked Bar Chart */}
      <div className="space-y-2">
        <div
          className={`${orientation === "horizontal" ? "flex flex-row h-16" : "flex flex-col"} rounded-lg overflow-hidden border`}
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

            // Pick the vertical label detail from the bar's actual pixel height,
            // not its percentage: 30% of a 120px card is only ~36px and can't
            // hold a two-line label, whereas 30% of a 320px card can.
            const verticalBarPx =
              orientation === "horizontal" ? 0 : ((parseFloat(height) || 320) * Math.max(percentage, 8)) / 100

            return (
              <div
                key={category.label}
                role="button"
                tabIndex={0}
                data-slot="heatmap-segment"
                data-category={category.label}
                data-selected={isSelected}
                aria-pressed={isSelected}
                aria-label={`${category.label}: ${category.count} items (${percentage.toFixed(1)}%)`}
                className={`${category.color} cursor-pointer transition-all hover:opacity-80 flex items-center justify-center text-white font-medium text-sm relative min-h-0 min-w-0 overflow-hidden ${
                  isSelected ? "ring-2 ring-blue-500 ring-inset" : ""
                }`}
                style={sizeStyle}
                onClick={() => onCategoryClick(category.label)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onCategoryClick(category.label)
                  }
                }}
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
                  // Vertical layout — label detail scales with the bar's height in px
                  <>
                    {verticalBarPx >= 52 && (
                      <div className="text-center px-2 leading-tight">
                        <div className="font-semibold text-sm">{category.label}</div>
                        <div className="text-sm font-bold">({category.count})</div>
                      </div>
                    )}
                    {verticalBarPx >= 26 && verticalBarPx < 52 && (
                      <div className="text-center px-1 leading-none">
                        <div className="text-xs font-bold">({category.count})</div>
                      </div>
                    )}
                    {verticalBarPx < 26 && (
                      <div className="text-center px-1 leading-none">
                        <div className="text-[10px] font-bold">{category.count}</div>
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
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {heatmapCategories.map((category) => {
            if (category.count === 0) return null
            const isSelected = selectedCategories.includes(category.label)

            return (
              <button
                key={category.label}
                type="button"
                data-slot="heatmap-legend-item"
                data-category={category.label}
                data-selected={isSelected}
                aria-pressed={isSelected}
                aria-label={`${category.label}: ${category.count}`}
                onClick={() => onCategoryClick(category.label)}
                className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-all hover:opacity-80 ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className={`w-3 h-3 rounded ${category.color}`}></div>
                <span className="text-gray-700 font-medium">{category.label}</span>
                <span className="text-gray-500">({category.count})</span>
              </button>
            )
          })}
        </div>
      )}


      {/* Active Filters - now using the extracted component */}
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
    return (
      <div className={className} data-slot="heatmap" data-orientation={orientation} data-type={selectedType}>
        {heatmapContent}
      </div>
    )
  } else {
    return (
      <Card className={className} data-slot="heatmap" data-orientation={orientation} data-type={selectedType}>
        <CardContent className="center">{heatmapContent}</CardContent>
      </Card>
    )
  }
}
