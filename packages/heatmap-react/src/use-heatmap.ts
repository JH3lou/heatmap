import { useState, useMemo } from "react"
import type { HeatmapConfig, HeatmapCategory } from "./heatmap"

export interface UseHeatmapProps<T> {
  data: T[]
  config: HeatmapConfig
  initialType: string
}

export function useHeatmap<T>({ data, config, initialType }: UseHeatmapProps<T>) {
  const [selectedType, setSelectedType] = useState(initialType)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const heatmapCategories = useMemo((): HeatmapCategory[] => {
    const typeConfig = config[selectedType]
    if (!typeConfig) return []
    return typeConfig.categories(data)
  }, [selectedType, data, config])

  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return data

    return data.filter((item) => {
      return selectedCategories.some((categoryLabel) => {
        const category = heatmapCategories.find((cat) => cat.label === categoryLabel)
        return category ? category.filter(item) : false
      })
    })
  }, [data, selectedCategories, heatmapCategories])

  const handleCategoryClick = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((cat) => cat !== categoryLabel) : [...prev, categoryLabel],
    )
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setSelectedCategories([]) // Clear filters when switching types
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  return {
    selectedType,
    selectedCategories,
    heatmapCategories,
    filteredData,
    handleCategoryClick,
    handleTypeChange,
    clearFilters,
  }
}
