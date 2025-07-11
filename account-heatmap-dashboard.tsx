"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, RefreshCw, Edit } from "lucide-react"
import { Heatmap } from "@/components/heatmap"
import { DataTableEditor } from "@/components/data-table-editor"
import { EditorDebug } from "@/components/editor-debug"
import { LayoutToggle } from "@/components/layout-toggle"
import { InlineHeatmapDemo } from "@/components/inline-heatmap-demo"
import { SideBySideDemo } from "@/components/side-by-side-demo"
import { DrawerDemo } from "@/components/drawer-demo"
import { ResizableSideBySideDemo } from "@/components/resizable-side-by-side-demo"
import { useHeatmap } from "@/hooks/use-heatmap"
import { accountHeatmapConfig, type Account } from "@/config/account-heatmap-config"
import { accountEditorFields } from "@/config/account-editor-config"

// Sample account data
const initialAccountData: Account[] = [
  {
    id: 1,
    name: "Johnson Trust",
    accountNumber: "ACC001",
    totalValue: 1250000,
    cashPercent: 15.2,
    driftPercent: 2.1,
    restrictions: "None",
    status: "Active",
    advisor: "Smith, John",
  },
  {
    id: 2,
    name: "Miller Family",
    accountNumber: "ACC002",
    totalValue: 850000,
    cashPercent: 3.8,
    driftPercent: -1.2,
    restrictions: "Tax Loss",
    status: "Pending",
    advisor: "Johnson, Mary",
  },
  {
    id: 3,
    name: "Davis Corp",
    accountNumber: "ACC003",
    totalValue: 2100000,
    cashPercent: 22.5,
    driftPercent: 4.8,
    restrictions: "ESG Only",
    status: "Active",
    advisor: "Brown, David",
  },
  {
    id: 4,
    name: "Wilson Retirement",
    accountNumber: "ACC004",
    totalValue: 450000,
    cashPercent: 1.2,
    driftPercent: 0.5,
    restrictions: "None",
    status: "On Hold",
    advisor: "Smith, John",
  },
  {
    id: 5,
    name: "Taylor Holdings",
    accountNumber: "ACC005",
    totalValue: 1800000,
    cashPercent: 8.7,
    driftPercent: -2.8,
    restrictions: "No Options",
    status: "Active",
    advisor: "Johnson, Mary",
  },
  {
    id: 6,
    name: "Anderson LLC",
    accountNumber: "ACC006",
    totalValue: 950000,
    cashPercent: 18.9,
    driftPercent: 3.2,
    restrictions: "None",
    status: "Closed",
    advisor: "Brown, David",
  },
  {
    id: 7,
    name: "Thompson Trust",
    accountNumber: "ACC007",
    totalValue: 650000,
    cashPercent: 0.8,
    driftPercent: 1.1,
    restrictions: "Tax Loss",
    status: "Active",
    advisor: "Smith, John",
  },
  {
    id: 8,
    name: "Garcia Family",
    accountNumber: "ACC008",
    totalValue: 1350000,
    cashPercent: 25.3,
    driftPercent: 5.2,
    restrictions: "ESG Only",
    status: "Pending",
    advisor: "Johnson, Mary",
  },
  {
    id: 9,
    name: "Martinez Corp",
    accountNumber: "ACC009",
    totalValue: 750000,
    cashPercent: 4.1,
    driftPercent: -0.8,
    restrictions: "None",
    status: "Active",
    advisor: "Brown, David",
  },
  {
    id: 10,
    name: "Rodriguez Trust",
    accountNumber: "ACC010",
    totalValue: 1150000,
    cashPercent: 12.4,
    driftPercent: 2.9,
    restrictions: "No Options",
    status: "On Hold",
    advisor: "Smith, John",
  },
]

export default function AccountHeatmapDashboard() {
  const [accountData, setAccountData] = useState<Account[]>(initialAccountData)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [layout, setLayout] = useState<"vertical" | "horizontal" | "inline" | "side-by-side" | "drawer" | "resizable" | "sortable">(
    "vertical",
  )

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
    initialType: "cash",
  })

  // Apply search filter on top of heatmap filtering
  const finalFilteredAccounts = heatmapFilteredData.filter(
    (account) =>
      !searchTerm ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.advisor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditAccount = (account: Account) => {
    console.log("Editing account:", account)
    setEditingAccount({ ...account })
    setIsEditDialogOpen(true)
  }

  const handleSaveAccount = (updatedAccount: Account) => {
    console.log("Saving account:", updatedAccount)
    setAccountData((prev) => prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc)))
    setEditingAccount(null)
    setIsEditDialogOpen(false)
  }

  const handleCloseEditor = () => {
    console.log("Closing editor")
    setIsEditDialogOpen(false)
    setEditingAccount(null)
  }

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

  const renderHeatmap = () => (
    <Heatmap
      data={accountData}
      config={accountHeatmapConfig}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      selectedCategories={selectedCategories}
      onCategoryClick={handleCategoryClick}
      onClearFilters={clearFilters}
      title="Account Heatmap"
      orientation={layout}
      height={layout === "vertical" ? "320px" : "64px"}
    />
  )

  const renderMainContent = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
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

      {/* Horizontal Heatmap (when layout is horizontal) */}
      {layout === "horizontal" && renderHeatmap()}

      {/* Account Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account #</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">Cash %</TableHead>
                  <TableHead className="text-right">Drift %</TableHead>
                  <TableHead>Restrictions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Actions</TableHead>
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
                      <Badge variant={account.restrictions === "None" ? "secondary" : "outline"}>
                        {account.restrictions}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{account.advisor}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditAccount(account)}
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
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Overview</h1>
            <p className="text-gray-600">Monitor and manage your book of business</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Layout Toggle */}
        <LayoutToggle
          layout={layout}
          onLayoutChange={(newLayout) => {
            setLayout(newLayout)
          }}
        />

        {/* Content based on layout */}
        {layout === "vertical" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Vertical Heatmap Sidebar */}
            <div className="lg:col-span-1">{renderHeatmap()}</div>
            {/* Main Content */}
            <div className="lg:col-span-3">{renderMainContent()}</div>
          </div>
        ) : layout === "horizontal" ? (
          /* Horizontal Layout */
          <div className="space-y-6">{renderMainContent()}</div>
        ) : layout === "inline" ? (
          /* Inline Layout Demo */
          <InlineHeatmapDemo accountData={accountData} />
        ) : layout === "side-by-side" ? (
          /* Side-by-Side Layout Demo */
          <SideBySideDemo accountData={accountData} onEditAccount={handleEditAccount} />
        ) : layout === "drawer" ? (
          /* Drawer Layout Demo */
          <DrawerDemo accountData={accountData} onEditAccount={handleEditAccount} />
        ) : layout === "resizable" ? (
          /* Resizable Side-by-Side Layout Demo */
          <ResizableSideBySideDemo accountData={accountData} onEditAccount={handleEditAccount} />
        ) : (
          /* Default to Drawer Layout Demo */
          <DrawerDemo accountData={accountData} onEditAccount={handleEditAccount} />
        )}

        {/* Edit Account Dialog */}
        <DataTableEditor
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditor}
          item={editingAccount}
          onSave={handleSaveAccount}
          fields={accountEditorFields}
          title="Edit Account"
        />

        {/* Debug Panel */}
        <EditorDebug
          isOpen={isEditDialogOpen}
          editingItem={editingAccount}
          fields={accountEditorFields}
          onToggle={() => {}}
        />
      </div>
    </div>
  )
}
