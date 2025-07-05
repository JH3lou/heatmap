import type { HeatmapConfig } from "@/components/heatmap"

export interface Account {
  id: number
  name: string
  accountNumber: string
  totalValue: number
  cashPercent: number
  driftPercent: number
  restrictions: string
  status: string
  advisor: string
}

export const accountHeatmapConfig: HeatmapConfig = {
  cash: {
    label: "Cash Levels",
    categories: (data: Account[]) => [
      {
        label: "HighCash",
        count: data.filter((acc) => acc.cashPercent > 15).length,
        color: "bg-blue-600",
        filter: (acc) => acc.cashPercent > 15,
      },
      {
        label: "MediumCash",
        count: data.filter((acc) => acc.cashPercent >= 5 && acc.cashPercent <= 15).length,
        color: "bg-blue-400",
        filter: (acc) => acc.cashPercent >= 5 && acc.cashPercent <= 15,
      },
      {
        label: "LowCash",
        count: data.filter((acc) => acc.cashPercent < 5).length,
        color: "bg-blue-200",
        filter: (acc) => acc.cashPercent < 5,
      },
    ],
  },
  drift: {
    label: "Drift Analysis",
    categories: (data: Account[]) => [
      {
        label: "HighDrift",
        count: data.filter((acc) => Math.abs(acc.driftPercent) > 3).length,
        color: "bg-red-600",
        filter: (acc) => Math.abs(acc.driftPercent) > 3,
      },
      {
        label: "MediumDrift",
        count: data.filter((acc) => Math.abs(acc.driftPercent) >= 1 && Math.abs(acc.driftPercent) <= 3).length,
        color: "bg-orange-400",
        filter: (acc) => Math.abs(acc.driftPercent) >= 1 && Math.abs(acc.driftPercent) <= 3,
      },
      {
        label: "LowDrift",
        count: data.filter((acc) => Math.abs(acc.driftPercent) < 1).length,
        color: "bg-green-400",
        filter: (acc) => Math.abs(acc.driftPercent) < 1,
      },
    ],
  },
  restrictions: {
    label: "Restrictions",
    categories: (data: Account[]) => [
      {
        label: "ESG Only",
        count: data.filter((acc) => acc.restrictions === "ESG Only").length,
        color: "bg-purple-600",
        filter: (acc) => acc.restrictions === "ESG Only",
      },
      {
        label: "Tax Loss",
        count: data.filter((acc) => acc.restrictions === "Tax Loss").length,
        color: "bg-yellow-500",
        filter: (acc) => acc.restrictions === "Tax Loss",
      },
      {
        label: "No Options",
        count: data.filter((acc) => acc.restrictions === "No Options").length,
        color: "bg-gray-500",
        filter: (acc) => acc.restrictions === "No Options",
      },
      {
        label: "None",
        count: data.filter((acc) => acc.restrictions === "None").length,
        color: "bg-green-500",
        filter: (acc) => acc.restrictions === "None",
      },
    ],
  },
  value: {
    label: "Account Value",
    categories: (data: Account[]) => [
      {
        label: "HighValue",
        count: data.filter((acc) => acc.totalValue > 1500000).length,
        color: "bg-emerald-600",
        filter: (acc) => acc.totalValue > 1500000,
      },
      {
        label: "MediumValue",
        count: data.filter((acc) => acc.totalValue >= 800000 && acc.totalValue <= 1500000).length,
        color: "bg-emerald-400",
        filter: (acc) => acc.totalValue >= 800000 && acc.totalValue <= 1500000,
      },
      {
        label: "LowValue",
        count: data.filter((acc) => acc.totalValue < 800000).length,
        color: "bg-emerald-200",
        filter: (acc) => acc.totalValue < 800000,
      },
    ],
  },
  status: {
    label: "Account Status",
    categories: (data: Account[]) => [
      {
        label: "Active",
        count: data.filter((acc) => acc.status === "Active").length,
        color: "bg-green-600",
        filter: (acc) => acc.status === "Active",
      },
      {
        label: "Pending",
        count: data.filter((acc) => acc.status === "Pending").length,
        color: "bg-yellow-600",
        filter: (acc) => acc.status === "Pending",
      },
      {
        label: "On Hold",
        count: data.filter((acc) => acc.status === "On Hold").length,
        color: "bg-orange-600",
        filter: (acc) => acc.status === "On Hold",
      },
      {
        label: "Closed",
        count: data.filter((acc) => acc.status === "Closed").length,
        color: "bg-gray-600",
        filter: (acc) => acc.status === "Closed",
      },
    ],
  },
}
