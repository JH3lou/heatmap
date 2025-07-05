"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react"
import { Heatmap } from "@/components/heatmap"
import { useHeatmap } from "@/hooks/use-heatmap"
import { accountHeatmapConfig, type Account } from "@/config/account-heatmap-config"

interface InlineHeatmapDemoProps {
  accountData: Account[]
}

export function InlineHeatmapDemo({ accountData }: InlineHeatmapDemoProps) {
  const { selectedType, selectedCategories, filteredData, handleCategoryClick, handleTypeChange, clearFilters } =
    useHeatmap({
      data: accountData,
      config: accountHeatmapConfig,
      initialType: "status",
    })

  // Calculate summary stats
  const totalValue = accountData.reduce((sum, acc) => sum + acc.totalValue, 0)
  const activeAccounts = accountData.filter((acc) => acc.status === "Active").length
  const avgCash = accountData.reduce((sum, acc) => sum + acc.cashPercent, 0) / accountData.length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Overview with Inline Heatmaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Summary with Inline Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</div>
                <div className="text-sm text-gray-500">Total AUM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{activeAccounts}</div>
                <div className="text-sm text-gray-500">Active Accounts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{avgCash.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Avg Cash</div>
              </div>
            </div>

            {/* Inline Heatmap */}
            <div className="border-t pt-4">
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
                onClearFilters={clearFilters}
                title="Account Distribution"
                orientation="horizontal"
                height="48px"
                inline={true}
                className="space-y-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis with Inline Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-semibold text-red-700">
                  {accountData.filter((acc) => Math.abs(acc.driftPercent) > 3).length}
                </div>
                <div className="text-sm text-red-600">High Drift</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-700">
                  {accountData.filter((acc) => acc.cashPercent > 15).length}
                </div>
                <div className="text-sm text-yellow-600">High Cash</div>
              </div>
            </div>

            {/* Inline Vertical Heatmap */}
            <div className="border-t pt-4">
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType="drift"
                onTypeChange={() => {}} // Read-only for this demo
                selectedCategories={[]}
                onCategoryClick={() => {}} // Read-only for this demo
                onClearFilters={() => {}}
                title="Drift Distribution"
                orientation="vertical"
                height="200px"
                inline={true}
                className="space-y-3"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface with Inline Heatmaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="status" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="value">Value</TabsTrigger>
              <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
              <TabsTrigger value="cash">Cash Levels</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Account Status Distribution</h4>
                <Badge variant="outline">{accountData.filter((acc) => acc.status === "Active").length} Active</Badge>
              </div>
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType="status"
                onTypeChange={() => {}}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
                onClearFilters={clearFilters}
                orientation="horizontal"
                height="56px"
                inline={true}
              />
            </TabsContent>

            <TabsContent value="value" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Account Value Distribution</h4>
                <Badge variant="outline">{formatCurrency(totalValue)} Total</Badge>
              </div>
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType="value"
                onTypeChange={() => {}}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
                onClearFilters={clearFilters}
                orientation="horizontal"
                height="56px"
                inline={true}
              />
            </TabsContent>

            <TabsContent value="restrictions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Account Restrictions</h4>
                <Badge variant="outline">
                  {accountData.filter((acc) => acc.restrictions !== "None").length} Restricted
                </Badge>
              </div>
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType="restrictions"
                onTypeChange={() => {}}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
                onClearFilters={clearFilters}
                orientation="horizontal"
                height="56px"
                inline={true}
              />
            </TabsContent>

            <TabsContent value="cash" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Cash Level Distribution</h4>
                <Badge variant="outline">{avgCash.toFixed(1)}% Average</Badge>
              </div>
              <Heatmap
                data={accountData}
                config={accountHeatmapConfig}
                selectedType="cash"
                onTypeChange={() => {}}
                selectedCategories={selectedCategories}
                onCategoryClick={handleCategoryClick}
                onClearFilters={clearFilters}
                orientation="horizontal"
                height="56px"
                inline={true}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Compact Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-sm">Quick Status</h4>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <Heatmap
              data={accountData}
              config={accountHeatmapConfig}
              selectedType="status"
              onTypeChange={() => {}}
              selectedCategories={[]}
              onCategoryClick={() => {}}
              onClearFilters={() => {}}
              orientation="vertical"
              height="120px"
              inline={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-sm">Value Tiers</h4>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </div>
            <Heatmap
              data={accountData}
              config={accountHeatmapConfig}
              selectedType="value"
              onTypeChange={() => {}}
              selectedCategories={[]}
              onCategoryClick={() => {}}
              onClearFilters={() => {}}
              orientation="vertical"
              height="120px"
              inline={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-sm">Cash Levels</h4>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
            <Heatmap
              data={accountData}
              config={accountHeatmapConfig}
              selectedType="cash"
              onTypeChange={() => {}}
              selectedCategories={[]}
              onCategoryClick={() => {}}
              onClearFilters={() => {}}
              orientation="vertical"
              height="120px"
              inline={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
