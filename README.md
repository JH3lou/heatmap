# Heatmap Component System

A comprehensive, reusable heatmap visualization system built with React and TypeScript. This system provides interactive data visualization through both vertical and horizontal stacked bar charts with real-time filtering and editing capabilities.

> **Looking to install and use the component?** This repository root is a Next.js
> demo/playground. The publishable, framework-agnostic packages live under
> [`packages/`](./packages):
>
> | Package | What it is | Use it in |
> |---------|-----------|-----------|
> | [`@jh3lou/account-heatmap`](./packages/heatmap-react) | The reusable React component (npm) | React / Next.js apps |
> | [`streamlit-account-heatmap`](./packages/streamlit-heatmap) | A bidirectional Streamlit v2 component wrapping the same UI | Streamlit apps |
>
> Both are authored by [Justin Helou](https://github.com/JH3lou) and MIT licensed.

## Overview

The Heatmap Component System is designed to be easily integrated into any data table within your application. It features a modular architecture that supports multiple data types, custom configurations, real-time data updates, and flexible orientation options.

## Reusable Components

### **`Heatmap` Component**
- Fully standalone and configurable
- Accepts data, configuration, and event handlers as props
- Works with any data type through generic interfaces
- **Supports both vertical and horizontal orientations**
- **Responsive design with dynamic resizing**
- Maintains consistent interactivity across orientations

### **`DataTableEditor` Component**
- Generic editor that works with any data structure
- Configurable field definitions
- Supports text, number, and select field types
- Reusable across different data tables

### **`useHeatmap` Hook**
- Encapsulates all heatmap logic and state management
- Handles filtering, category selection, and data processing
- Reusable across different implementations

### **`LayoutToggle` Component**
- **NEW**: Demo component for switching between layout orientations
- Visual feedback for current layout state
- Easy integration for testing different orientations

## Configuration System

### **Modular Configuration**
- `accountHeatmapConfig.ts` - Defines all heatmap types and their logic
- `accountEditorConfig.ts` - Defines editable fields and their types
- Easy to extend with new heatmap types or field configurations

### **Type Safety**
- Full TypeScript support with proper interfaces
- Generic components that work with any data structure
- Compile-time validation of configurations

## Key Features

**Dual Orientation Support**: Choose between vertical sidebar or horizontal top-bar layouts

**Account Status Heatmap**: Includes Active, Pending, On Hold, and Closed categories with appropriate color coding.

**Real-time Updates**: Changes in the editor immediately update both the data table and heatmap visualization.

**Responsive Design**: Automatically adapts to different screen sizes and content variations.

**Inline Mode**: NEW - Embed heatmaps directly within existing cards and containers without the default card wrapper

**Easy Integration**: The heatmap can be dropped into any data table with minimal setup:

```tsx
<Heatmap
  data={yourData}
  config={yourConfig}
  selectedType={selectedType}
  onTypeChange={handleTypeChange}
  selectedCategories={selectedCategories}
  onCategoryClick={handleCategoryClick}
  onClearFilters={clearFilters}
  title="Your Heatmap Title"
  orientation="horizontal" // or "vertical"
  height="64px" // customizable height
  inline={true} // NEW: removes card wrapper
/>
```

## Installation

1. Copy the component files to your project:
   - `components/heatmap.tsx`
   - `components/data-table-editor.tsx`
   - `components/layout-toggle.tsx` (for demo purposes)
   - `hooks/use-heatmap.ts`

2. Install required dependencies:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-select lucide-react
```

## Quick Start

### 1. Define Your Data Interface

```tsx
interface YourDataType {
  id: number
  name: string
  status: string
  // ... other fields
}
```

### 2. Create Heatmap Configuration

```tsx
import type { HeatmapConfig } from '@/components/heatmap'

export const yourHeatmapConfig: HeatmapConfig = {
  status: {
    label: "Status Distribution",
    categories: (data: YourDataType[]) => [
      {
        label: "Active",
        count: data.filter(item => item.status === "Active").length,
        color: "bg-green-600",
        filter: (item) => item.status === "Active",
      },
      // ... more categories
    ],
  },
  // ... more heatmap types
}
```

### 3. Implement with Layout Options

```tsx
import { Heatmap } from '@/components/heatmap'
import { LayoutToggle } from '@/components/layout-toggle'

export function YourDashboard() {
  const [data, setData] = useState<YourDataType[]>(initialData)
  const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical")
  
  const {
    selectedType,
    selectedCategories,
    filteredData,
    handleCategoryClick,
    handleTypeChange,
    clearFilters,
  } = useHeatmap({
    data,
    config: yourHeatmapConfig,
    initialType: "status",
  })

  return (
    <div className="space-y-6">
      {/* Layout Toggle for Demo */}
      <LayoutToggle layout={layout} onLayoutChange={setLayout} />
      
      {layout === "vertical" ? (
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <Heatmap
              data={data}
              config={yourHeatmapConfig}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              selectedCategories={selectedCategories}
              onCategoryClick={handleCategoryClick}
              onClearFilters={clearFilters}
              title="Your Heatmap"
              orientation="vertical"
            />
          </div>
          <div className="col-span-3">
            {/* Your data table here */}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Heatmap
            data={data}
            config={yourHeatmapConfig}
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            selectedCategories={selectedCategories}
            onCategoryClick={handleCategoryClick}
            onClearFilters={clearFilters}
            title="Your Heatmap"
            orientation="horizontal"
            height="64px"
          />
          {/* Your data table here */}
        </div>
      )}
    </div>
  )
}
```

## API Reference

### Heatmap Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `any[]` | Array of data items to visualize |
| `config` | `HeatmapConfig` | Configuration object defining heatmap types |
| `selectedType` | `string` | Currently selected heatmap type |
| `onTypeChange` | `(type: string) => void` | Handler for heatmap type changes |
| `selectedCategories` | `string[]` | Array of selected category labels |
| `onCategoryClick` | `(category: string) => void` | Handler for category selection |
| `onClearFilters` | `() => void` | Handler to clear all filters |
| `title` | `string` | Optional title for the heatmap |
| `className` | `string` | Optional CSS classes |
| **`orientation`** | **`"vertical" \| "horizontal"`** | **Layout orientation (default: "vertical")** |
| **`height`** | **`string`** | **Custom height (default: "320px")** |
| **`inline`** | **`boolean`** | **Remove card wrapper for embedding (default: false)** |

### LayoutToggle Props

| Prop | Type | Description |
|------|------|-------------|
| `layout` | `"vertical" \| "horizontal"` | Current layout orientation |
| `onLayoutChange` | `(layout: "vertical" \| "horizontal") => void` | Handler for layout changes |

## Orientation Features

### **Vertical Orientation (Sidebar)**
- Traditional sidebar layout with vertical stacked bars
- Ideal for detailed category analysis
- Better for narrow datasets
- Maintains full category labels and counts

### **Horizontal Orientation (Top Bar)**
- Compact horizontal bar above the data table
- Space-efficient for wide datasets
- Includes interactive legend below the bar
- Responsive text sizing based on segment width

### **Responsive Behavior**
- Automatic text sizing based on available space
- Dynamic legend display for horizontal orientation
- Consistent interactivity across orientations
- Smooth transitions between layout changes

## Inline Mode
- **Embedded Integration**: Remove the default card wrapper to embed heatmaps within existing containers
- **Flexible Placement**: Perfect for dashboard cards, tabs, and multi-section layouts
- **Consistent Styling**: Maintains all functionality while adapting to parent container styling
- **Space Efficient**: Reduces visual clutter in dense dashboard layouts

### Inline Use Cases
- **Dashboard Cards**: Embed within summary or overview cards
- **Tabbed Interfaces**: Include in tab content without extra card nesting
- **Sidebar Widgets**: Compact visualizations in navigation areas
- **Multi-Panel Layouts**: Seamless integration with existing card structures

## Layout Considerations

### **When to Use Vertical**
- Detailed category analysis needed
- Sidebar space available
- Fewer than 6-8 categories
- Desktop-first applications

### **When to Use Horizontal**
- Space-constrained layouts
- Wide data tables
- Mobile-responsive designs
- Dashboard overview screens

## Examples

### **Responsive Layout Implementation**

```tsx
const useResponsiveLayout = () => {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical")
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setLayout("horizontal")
      } else {
        setLayout("vertical")
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return { layout, setLayout }
}
```

### **Custom Height Configuration**

```tsx
<Heatmap
  orientation="horizontal"
  height="80px" // Taller horizontal bar
  // ... other props
/>

<Heatmap
  orientation="vertical"
  height="400px" // Taller vertical sidebar
  // ... other props
/>
```

```tsx
// Inline within existing card
<Card>
  <CardHeader>
    <CardTitle>Portfolio Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>Total: $2.5M</div>
      <div>Accounts: 25</div>
    </div>
    <Heatmap
      data={portfolioData}
      config={portfolioConfig}
      selectedType="status"
      onTypeChange={handleTypeChange}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
      onClearFilters={clearFilters}
      orientation="horizontal"
      inline={true}
    />
  </CardContent>
</Card>
```

## Additional Layout Demonstrations

### **Side-by-Side Layout**
- **Shared Card Integration**: Heatmap and data table positioned side-by-side within a single card
- **Visual Separation**: Clear divider between heatmap and table sections
- **Optimized Space Usage**: Efficient use of horizontal screen real estate
- **Synchronized Filtering**: Real-time updates between visualization and data

### **Drawer Overlay**
- **Sliding Panel**: Heatmap accessible via a drawer that slides from the side
- **Overlay Design**: Drawer overlays the main content without disrupting layout
- **Toggle Mechanism**: Easy open/close functionality with visual indicators
- **Mobile Optimized**: Floating action button for mobile access
- **Rich Context**: Includes summary statistics and quick actions

## Layout Use Cases

### **When to Use Side-by-Side**
- Desktop applications with wide screens
- Detailed analysis requiring simultaneous view of data and visualization
- Professional dashboards where space efficiency is important
- Scenarios requiring constant reference to both heatmap and table

### **When to Use Drawer**
- Mobile-responsive applications
- Space-constrained interfaces
- Optional analytics that don't need constant visibility
- Workflows where the heatmap is used for periodic analysis

## Implementation Examples

### **Side-by-Side Layout**

```tsx
<SideBySideDemo 
  accountData={accountData} 
  onEditAccount={handleEditAccount} 
/>
```

### **Drawer Layout**

```tsx
<DrawerDemo 
  accountData={accountData} 
  onEditAccount={handleEditAccount} 
/>
```

### **Resizable Side-by-Side Layout**
- **Interactive Resizing**: Drag the divider to adjust heatmap and table proportions
- **Smooth Animations**: Fluid transitions during resize operations
- **Constrained Sizing**: Intelligent limits (20%-70%) to maintain usability
- **Visual Feedback**: Hover states and resize indicators for better UX
- **Persistent Layout**: Maintains proportions during data updates
- **Reset Functionality**: Quick return to default sizing

## Resizing Features

### **Interactive Divider**
- **Drag-to-Resize**: Intuitive mouse-based resizing mechanism
- **Visual Indicators**: Clear hover states and resize cursors
- **Smooth Transitions**: Animated size changes for better user experience
- **Constraint Handling**: Automatic enforcement of minimum and maximum sizes

### **Responsive Behavior**
- **Minimum Widths**: Ensures both components remain functional at all sizes
- **Proportional Scaling**: Maintains aspect ratios during resize operations
- **Content Adaptation**: Components automatically adjust to new dimensions
- **Performance Optimized**: Efficient rendering during resize operations

### **User Experience**
- **Intuitive Controls**: Clear visual cues for resizing capability
- **Accessibility**: Keyboard and screen reader friendly
- **Mobile Considerations**: Touch-friendly resize handles
- **Reset Options**: Easy return to default layout proportions

## Implementation Examples

### **Resizable Layout**

```tsx
<ResizableSideBySideDemo 
  accountData={accountData} 
  onEditAccount={handleEditAccount} 
/>
```

### **Custom Resizable Hook**

```tsx
const {
  leftPanelWidth,
  rightPanelWidth,
  isResizing,
  containerRef,
  handleMouseDown,
  resetToDefault,
} = useResizablePanels({
  initialLeftWidth: 33.33,
  minLeftWidth: 20,
  maxLeftWidth: 70,
})
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please open an issue in the repository or contact the development team.
