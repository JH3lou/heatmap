"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Filter, Edit, BarChart3 } from "lucide-react"
import { Heatmap } from "@/components/heatmap"
import { useHeatmap } from "@/hooks/use-heatmap"
import { accountHeatmapConfig, type Account } from "@/config/account-heatmap-config"

interface SideBySideDemoProps {
  accountData: Account[]
  onEditAccount: (account: Account) => void
}

export function SideBySideDemo({ accountData, onEditAccount }: SideBySideDemoProps) {
  const [searchTerm, setSearchTerm] = useState("")

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
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-orange-100 text-orange-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search accounts, numbers, or advisors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="whitespace-nowrap">
              {finalFilteredAccounts.length} of {accountData.length} accounts
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Flexbox Side-by-Side Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Account Analysis - Side by Side View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {/* Heatmap Section - Hidden on screens smaller than lg */}
            <div className="hidden lg:block w-1/3">
              
              <div className="border-r border-gray-200 pr-6">
                <Heatmap
                  data={accountData}
                  config={accountHeatmapConfig}
                  selectedType={selectedType}
                  onTypeChange={handleTypeChange}
                  selectedCategories={selectedCategories}
                  onCategoryClick={handleCategoryClick}
                  onClearFilters={clearFilters}
                  orientation="vertical"
                  height="400px"
                  inline={true}
                  className="space-y-3"
                />
              </div>
            </div>

            {/* Data Table Section - Flexible growth */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-sm text-gray-700">Account Details</h4>
                <Badge variant="secondary" className="text-xs">
                  {finalFilteredAccounts.length} filtered results
                </Badge>
              </div>
              <div className="overflow-x-auto overflow-y-auto border rounded-lg">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                      <TableHead className="w-[200px]">Account Name</TableHead>
                      <TableHead className="w-[120px]">Account #</TableHead>
                      <TableHead className="text-right w-[120px]">Total Value</TableHead>
                      <TableHead className="text-right w-[80px]">Cash %</TableHead>
                      <TableHead className="text-right w-[80px]">Drift %</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[60px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finalFilteredAccounts.map((account) => (
                      <TableRow key={account.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{account.name}</TableCell>
                        <TableCell className="font-mono text-sm">{account.accountNumber}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(account.totalValue)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              account.cashPercent > 15
                                ? "bg-blue-100 text-blue-800"
                                : account.cashPercent < 5
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {account.cashPercent.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              Math.abs(account.driftPercent) > 3
                                ? "bg-red-100 text-red-800"
                                : Math.abs(account.driftPercent) > 1
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {account.driftPercent > 0 ? "+" : ""}
                            {account.driftPercent.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditAccount(account)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
