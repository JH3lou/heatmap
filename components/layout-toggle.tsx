"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, Rows3, Columns, PanelRight, GripVertical } from "lucide-react"

export interface LayoutToggleProps {
  layout: "vertical" | "horizontal" | "inline" | "side-by-side" | "drawer" | "resizable" | "sortable"
  onLayoutChange: (layout: "vertical" | "horizontal" | "inline" | "side-by-side" | "drawer" | "resizable" | "sortable") => void
}

export function LayoutToggle({ layout, onLayoutChange }: LayoutToggleProps) {
  const getLayoutDescription = () => {
    switch (layout) {
      case "vertical":
        return "Heatmap displayed as a sidebar with vertical stacked bars"
      case "horizontal":
        return "Heatmap displayed as a horizontal bar above the data table"
      case "inline":
        return "Heatmaps embedded inline within shared dashboard cards"
      case "side-by-side":
        return "Heatmap positioned beside the data table within a shared card"
      case "drawer":
        return "Heatmap accessible via a sliding drawer overlay"
      case "resizable":
        return "Heatmap and table side-by-side with adjustable sizing via draggable divider"
      case "sortable":
        return "Heatmap and table with sortable columns for dynamic reordering and traditional togglable filters"
      default:
        return ""
    }
  }

  const getLayoutLabel = () => {
    switch (layout) {
      case "vertical":
        return "Sidebar"
      case "horizontal":
        return "Top Bar"
      case "inline":
        return "Inline Cards"
      case "side-by-side":
        return "Side-by-Side"
      case "drawer":
        return "Drawer"
      case "resizable":
        return "Resizable"
      case "sortable":
        return "Sortable"
      default:
        return ""
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Layout Demonstrations</h3>
            <Badge variant="outline" className="text-xs">
              Current: {getLayoutLabel()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-4">
          <Button
            variant={layout === "vertical" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("vertical")}
            className="flex items-center gap-2"
          >
            <LayoutGrid className="h-4 w-3" />
            Sidebar
          </Button>
          <Button
            variant={layout === "horizontal" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("horizontal")}
            className="flex items-center gap-2"
          >
            <Rows3 className="h-4 w-3" />
            Top Bar
          </Button>
          <Button
            variant={layout === "inline" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("inline")}
            className="flex items-center gap-2"
          >
            <LayoutGrid className="h-4 w-3" />
            Inline
          </Button>
          <Button
            variant={layout === "side-by-side" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("side-by-side")}
            className="flex items-center gap-2"
          >
            <Columns className="h-4 w-3" />
            Side-by-Side
          </Button>
          <Button
            variant={layout === "drawer" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("drawer")}
            className="flex items-center gap-2"
          >
            <PanelRight className="h-4 w-3" />
            Drawer
          </Button>
          <Button
            variant={layout === "resizable" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("resizable")}
            className="flex items-center gap-2"
          >
            <GripVertical className="h-4 w-3" />
            Resizable
          </Button>
          <Button
            variant={layout === "sortable" ? "default" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("sortable")}
            className="flex items-center gap-2"
          >
            <GripVertical className="h-4 w-3" />
            Sortable
          </Button>
        </div>

        <p className="text-sm text-gray-600">{getLayoutDescription()}</p>
      </CardContent>
    </Card>
  )
}
