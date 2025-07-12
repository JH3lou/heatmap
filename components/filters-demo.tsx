"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ActiveFilters } from "./active-filters"

export function FiltersDemo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Active", "Pending", "High Value"])

  const handleClearFilters = () => {
    setSelectedCategories([])
  }

  const handleRemoveFilter = (category: string) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== category))
  }

  const handleAddFilter = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category])
    }
  }

  const availableFilters = ["Active", "Pending", "Closed", "High Value", "Tax Loss", "ESG Only"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Filters Component Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add some filters for testing */}
          <div>
            <h4 className="text-sm font-medium mb-2">Add Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddFilter(filter)}
                  disabled={selectedCategories.includes(filter)}
                  className="text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Default variant */}
          <div>
            <h4 className="text-sm font-medium mb-2">Default Variant:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                onRemoveFilter={handleRemoveFilter}
              />
            </div>
          </div>

          {/* Compact variant */}
          <div>
            <h4 className="text-sm font-medium mb-2">Compact Variant:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                onRemoveFilter={handleRemoveFilter}
                variant="compact"
                title="Filters:"
              />
            </div>
          </div>

          {/* Inline variant */}
          <div>
            <h4 className="text-sm font-medium mb-2">Inline Variant:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                onRemoveFilter={handleRemoveFilter}
                variant="inline"
                title="Applied:"
              />
            </div>
          </div>

          {/* Without clear all button */}
          <div>
            <h4 className="text-sm font-medium mb-2">Without Clear All Button:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                onRemoveFilter={handleRemoveFilter}
                showClearAll={false}
              />
            </div>
          </div>

          {/* Without individual remove */}
          <div>
            <h4 className="text-sm font-medium mb-2">Without Individual Remove:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                title="Read-only Filters:"
              />
            </div>
          </div>

          {/* Without individual remove */}
          <div>
            <h4 className="text-sm font-medium mb-2">Show With No Active Filters:</h4>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ActiveFilters
                selectedCategories={selectedCategories}
                onClearFilters={handleClearFilters}
                onRemoveFilter={handleRemoveFilter}
                title="Active Filters:"
                showWhenEmpty={true}
              />
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}
