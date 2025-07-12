"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, Edit, BarChart3, ChevronRight, Download, FileText, Calendar } from "lucide-react"
import { Heatmap } from "@/components/heatmap"
import { useHeatmap } from "@/hooks/use-heatmap"
import { accountHeatmapConfig, type Account } from "@/config/account-heatmap-config"

interface DrawerDemoProps {
  accountData: Account[]
  onEditAccount: (account: Account) => void
}

export function DrawerDemo({ accountData, onEditAccount }: DrawerDemoProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const {
    selectedType,
    selectedCategories,
    filteredData: heatmapFilteredData,
    handleCategoryClick,
    handleTypeChange,
    clearFilters,
  } = useHeatmap({
    data: accountData,
    config: accountHeatmapConfig,
    initialType: "status",
  })

  // Apply search filter on top of heatmap filtering
  const finalFilteredAccounts = heatmapFilteredData.filter(
    (account) =>
      !searchTerm ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.advisor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "On Hold":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Calculate summary statistics
  const totalAUM = accountData.reduce((sum, acc) => sum + acc.totalValue, 0)
  const activeAccounts = accountData.filter((acc) => acc.status === "Active").length

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="gap-2">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search accounts, numbers, or advisors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Badge variant="outline" className="whitespace-nowrap px-3 py-1 border-gray-300">
              {finalFilteredAccounts.length} of {accountData.length} accounts
            </Badge>

            {/* Drawer Toggle Button */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px] max-w-[90vw] p-0 flex flex-col border-l border-gray-200"
              >
                <SheetHeader className="px-6 py-4 border-b border-gray-200 bg-white">
                  <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Account Analytics
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto bg-gray-50">
                  <div className="p-6 space-y-6">
                    {/* Summary Stats */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Portfolio Overview
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">Active</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">{activeAccounts}</div>
                          <div className="text-xs text-gray-600">
                            {((activeAccounts / accountData.length) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-xs font-medium text-green-700 uppercase tracking-wide">
                              Total AUM
                            </span>
                          </div>
                          <div className="text-lg font-bold text-gray-900 mb-1">{formatCurrency(totalAUM)}</div>
                          <div className="text-xs text-gray-600">
                            Avg: {formatCurrency(totalAUM / accountData.length)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Heatmap Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Data Distribution</h3>
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <Heatmap
                          data={accountData}
                          config={accountHeatmapConfig}
                          selectedType={selectedType}
                          onTypeChange={handleTypeChange}
                          selectedCategories={selectedCategories}
                          onCategoryClick={handleCategoryClick}
                          onClearFilters={clearFilters}
                          orientation="vertical"
                          height="300px"
                          inline={true}
                          className="space-y-4"
                        />
                      </div>
                    </div>

                    <Separator className="bg-gray-200" />

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          size="default"
                          className="w-full justify-start h-11 bg-white hover:bg-gray-50 border-gray-200 text-left"
                        >
                          <Download className="h-4 w-4 mr-3 text-gray-500" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Export Filtered Data</span>
                            <span className="text-xs text-gray-500">{finalFilteredAccounts.length} records</span>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          className="w-full justify-start h-11 bg-white hover:bg-gray-50 border-gray-200 text-left"
                        >
                          <FileText className="h-4 w-4 mr-3 text-gray-500" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Generate Report</span>
                            <span className="text-xs text-gray-500">Portfolio analysis</span>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          className="w-full justify-start h-11 bg-white hover:bg-gray-50 border-gray-200 text-left"
                        >
                          <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Schedule Analysis</span>
                            <span className="text-xs text-gray-500">Automated review</span>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Filter Summary */}
                    {selectedCategories.length > 0 && (
                      <>
                        <Separator className="bg-gray-200" />
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Active Filters
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="text-xs px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="w-full text-sm h-9 hover:bg-gray-100 border border-gray-200 bg-white"
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>

      {/* Main Data Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Account Details - Drawer Analytics View
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 text-sm hover:bg-gray-100 px-3 py-2"
            >
              <BarChart3 className="h-4 w-4" />
              Open Analytics
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Account Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Account #</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900 py-4 px-6">Total Value</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900 py-4 px-6">Cash %</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900 py-4 px-6">Drift %</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Restrictions</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Advisor</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalFilteredAccounts.map((account) => (
                  <TableRow key={account.id} className="hover:bg-gray-50/50 border-b border-gray-100">
                    <TableCell className="font-medium py-4 px-6">{account.name}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-600 py-4 px-6">{account.accountNumber}</TableCell>
                    <TableCell className="text-right font-medium py-4 px-6">
                      {formatCurrency(account.totalValue)}
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium border ${
                          account.cashPercent > 15
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : account.cashPercent < 5
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {account.cashPercent.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-medium border ${
                          Math.abs(account.driftPercent) > 3
                            ? "bg-red-100 text-red-800 border-red-200"
                            : Math.abs(account.driftPercent) > 1
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        {account.driftPercent > 0 ? "+" : ""}
                        {account.driftPercent.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge
                        variant={account.restrictions === "None" ? "secondary" : "outline"}
                        className="border border-gray-200"
                      >
                        {account.restrictions}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge className={`${getStatusColor(account.status)} border`}>{account.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 py-4 px-6">{account.advisor}</TableCell>
                    <TableCell className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditAccount(account)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Floating Analytics Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 border-0"
          size="sm"
        >
          <BarChart3 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
