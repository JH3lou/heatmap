"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface ActiveFiltersProps {
  selectedCategories: string[]
  onClearFilters: () => void
  onRemoveFilter?: (category: string) => void
  title?: string
  showClearAll?: boolean
  variant?: "default" | "compact" | "inline"
  className?: string
}

export function ActiveFilters({
  selectedCategories,
  onClearFilters,
  onRemoveFilter,
  title = "Active Filters:",
  showClearAll = true,
  variant = "default",
  className = "",
}: ActiveFiltersProps) {
  if (selectedCategories.length === 0) {
    return null
  }

  const containerClasses = {
    default: "pt-4 border-t",
    compact: "py-2",
    inline: "flex items-center gap-4",
  }

  const headerClasses = {
    default: "flex items-center justify-between mb-2",
    compact: "flex items-center justify-between mb-1",
    inline: "flex items-center gap-2",
  }

  const badgeContainerClasses = {
    default: "flex flex-wrap gap-1",
    compact: "flex flex-wrap gap-1",
    inline: "flex flex-wrap gap-1",
  }

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      <div className={headerClasses[variant]}>
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {showClearAll && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-6 px-2 text-xs hover:bg-gray-100">
            Clear All
          </Button>
        )}
      </div>
      <div className={badgeContainerClasses[variant]}>
        {selectedCategories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className={`text-xs ${onRemoveFilter ? "cursor-pointer hover:bg-gray-200 pr-1" : ""}`}
            onClick={onRemoveFilter ? () => onRemoveFilter(category) : undefined}
          >
            {category}
            {onRemoveFilter && <X className="h-3 w-3 ml-1 hover:text-gray-600" />}
          </Badge>
        ))}
      </div>
    </div>
  )
}
