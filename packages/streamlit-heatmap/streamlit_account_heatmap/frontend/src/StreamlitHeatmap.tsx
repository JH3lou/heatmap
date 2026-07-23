import { useEffect, useMemo, useState } from "react"
import {
  Streamlit,
  withStreamlitConnection,
  type ComponentProps,
} from "streamlit-component-lib"
import { Heatmap, buildConfigFromRules, type RulesConfig } from "@heatmap"

interface HeatmapArgs {
  data: Record<string, any>[]
  config: RulesConfig
  initialType?: string
  title?: string
  orientation?: "vertical" | "horizontal"
  height?: string
  inline?: boolean
  showFilters?: boolean
}

function StreamlitHeatmap({ args }: ComponentProps) {
  const {
    data = [],
    config: rulesConfig = {},
    initialType,
    title = "Heatmap",
    orientation = "vertical",
    height = "320px",
    inline = false,
    showFilters = true,
  } = args as HeatmapArgs

  const config = useMemo(() => buildConfigFromRules(rulesConfig), [rulesConfig])

  const typeKeys = useMemo(() => Object.keys(rulesConfig), [rulesConfig])
  const firstType = initialType && rulesConfig[initialType] ? initialType : typeKeys[0]

  const [selectedType, setSelectedType] = useState<string>(firstType)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Keep the selected type valid if the incoming config changes.
  useEffect(() => {
    if (!rulesConfig[selectedType] && firstType) {
      setSelectedType(firstType)
      setSelectedCategories([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rulesConfig])

  const categories = useMemo(() => {
    const typeConfig = config[selectedType]
    return typeConfig ? typeConfig.categories(data) : []
  }, [config, selectedType, data])

  const filteredIndices = useMemo(() => {
    if (selectedCategories.length === 0) {
      return data.map((_, i) => i)
    }
    const indices: number[] = []
    data.forEach((item, i) => {
      const matches = selectedCategories.some((label) => {
        const category = categories.find((c) => c.label === label)
        return category ? category.filter(item) : false
      })
      if (matches) indices.push(i)
    })
    return indices
  }, [data, selectedCategories, categories])

  // Report the current selection (and matching row indices) back to Python.
  useEffect(() => {
    Streamlit.setComponentValue({
      type: selectedType,
      categories: selectedCategories,
      indices: filteredIndices,
    })
  }, [selectedType, selectedCategories, filteredIndices])

  // Ensure the iframe grows/shrinks to fit the content after every render.
  useEffect(() => {
    Streamlit.setFrameHeight()
  })

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setSelectedCategories([])
  }

  const handleCategoryClick = (label: string) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    )
  }

  const clearFilters = () => setSelectedCategories([])

  return (
    <div className="p-1">
      <Heatmap
        data={data}
        config={config}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedCategories={selectedCategories}
        onCategoryClick={handleCategoryClick}
        onClearFilters={clearFilters}
        title={title}
        orientation={orientation}
        height={height}
        inline={inline}
        showFilters={showFilters}
      />
    </div>
  )
}

export default withStreamlitConnection(StreamlitHeatmap)
