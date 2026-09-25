import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  BarChart3,
  Table,
  SplitSquareHorizontal,
  PanelRightOpen,
  Layers,
  PanelLeftOpen,
  Palette,
} from "lucide-react"

interface LayoutOption {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface LayoutToggleProps {
  currentLayout: string
  onLayoutChange: (layout: string) => void
}

export function LayoutToggle({
  currentLayout,
  onLayoutChange,
}: LayoutToggleProps) {
  const layouts: LayoutOption[] = [
    {
      id: "vertical",
      label: "Vertical",
      icon: Sidebar,
      description: "Heatmap in a collapsible sidebar panel",
    },
    {
      id: "horizontal",
      label: "Horizontal",
      icon: BarChart3,
      description: "Horizontal heatmap above the data table",
    },
    {
      id: "inline",
      label: "Inline",
      icon: Table,
      description: "Heatmap integrated within table cards",
    },
    {
      id: "side-by-side",
      label: "Side-by-Side",
      icon: SplitSquareHorizontal,
      description: "Heatmap and table displayed side by side",
    },
    {
      id: "drawer",
      label: "Drawer",
      icon: PanelRightOpen,
      description: "Heatmap accessible via a sliding drawer overlay",
    },
    {
      id: "resizable",
      label: "Resizable",
      icon: Layers,
      description: "Side-by-side layout with resizable panels",
    },
    {
      id: "filters",
      label: "Filters Demo",
      icon: PanelLeftOpen,
      description: "Demonstration of the Active Filters component",
    },
    {
      id: "playground",
      label: "Theme Playground",
      icon: Palette,
      description: "Restyle the components with shadcn presets across base primitive libraries",
    },
  ]

  const activeOption = layouts.find((o) => o.id === currentLayout)

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Layout Demonstrations</CardTitle>
        <p className="text-sm text-gray-600">
          {activeOption?.description}
        </p>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="flex gap-2">
          {layouts.map(({ id, label, icon: Icon }) => {
            const isActive = id === currentLayout
            return (
              <Button
                key={id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => onLayoutChange(id)}
              >
                <Icon className="h-4 w-4" />
                {label}
                {isActive && (
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs"
                  >
                    Current
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
