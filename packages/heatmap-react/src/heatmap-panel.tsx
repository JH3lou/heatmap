"use client"

import { useEffect, useRef } from "react"
import { Heatmap, type HeatmapConfig } from "./heatmap"
import { useHeatmap } from "./use-heatmap"

export interface HeatmapFilterResult<T> {
  /** The rows matching the current selection (all rows when nothing is selected). */
  filteredData: T[]
  /** The active heatmap type key. */
  selectedType: string
  /** The currently selected category labels. */
  selectedCategories: string[]
}

export interface HeatmapPanelProps<T> {
  /** Items to visualize. */
  data: T[]
  /** Heatmap types and their categories. */
  config: HeatmapConfig
  /** Which heatmap type to show first. */
  initialType: string
  /**
   * Called whenever the selection (and therefore the filtered rows) changes,
   * and once on mount. Use it to drive your own table off `filteredData`.
   */
  onFilter?: (result: HeatmapFilterResult<T>) => void
  /** Optional heading. */
  title?: string
  /** Extra classes on the root. */
  className?: string
  /** Layout orientation. */
  orientation?: "vertical" | "horizontal"
  /** Bar height (vertical only). */
  height?: string
  /** Remove the card wrapper for embedding. */
  inline?: boolean
  /** Show the active-filters chips. */
  showFilters?: boolean
  /** Filter chip layout. */
  filtersVariant?: "default" | "compact" | "inline"
}

/**
 * Uncontrolled convenience wrapper around {@link Heatmap}.
 *
 * `Heatmap` is fully controlled — it needs the `useHeatmap` state and seven
 * props wired up by hand. `HeatmapPanel` owns that state internally, so the
 * common case collapses to a single tag: pass `data`, `config`, `initialType`,
 * and read the filtered rows back through `onFilter`.
 *
 * ```tsx
 * <HeatmapPanel
 *   data={accounts}
 *   config={config}
 *   initialType="status"
 *   onFilter={({ filteredData }) => setRows(filteredData)}
 * />
 * ```
 *
 * Reach for {@link Heatmap} + {@link useHeatmap} directly when you need to own
 * the selection state (e.g. to sync it with a URL or share it across widgets).
 */
export function HeatmapPanel<T>({
  data,
  config,
  initialType,
  onFilter,
  title,
  className,
  orientation,
  height,
  inline,
  showFilters,
  filtersVariant,
}: HeatmapPanelProps<T>) {
  const {
    selectedType,
    selectedCategories,
    filteredData,
    handleCategoryClick,
    handleTypeChange,
    clearFilters,
  } = useHeatmap<T>({ data, config, initialType })

  // Keep the latest callback in a ref so an inline `onFilter` (new identity
  // every render) doesn't re-fire the effect or risk an update loop.
  const onFilterRef = useRef(onFilter)
  onFilterRef.current = onFilter

  useEffect(() => {
    onFilterRef.current?.({ filteredData, selectedType, selectedCategories })
  }, [filteredData, selectedType, selectedCategories])

  return (
    <Heatmap
      data={data}
      config={config}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
      onClearFilters={clearFilters}
      title={title}
      className={className}
      orientation={orientation}
      height={height}
      inline={inline}
      showFilters={showFilters}
      filtersVariant={filtersVariant}
    />
  )
}
