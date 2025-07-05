import type { FieldConfig } from "@/components/data-table-editor"

export const accountEditorFields: FieldConfig[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
  },
  {
    key: "totalValue",
    label: "Total Value",
    type: "number",
  },
  {
    key: "cashPercent",
    label: "Cash %",
    type: "number",
    step: "0.1",
  },
  {
    key: "driftPercent",
    label: "Drift %",
    type: "number",
    step: "0.1",
  },
  {
    key: "restrictions",
    label: "Restrictions",
    type: "select",
    options: ["None", "ESG Only", "Tax Loss", "No Options"],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Pending", "On Hold", "Closed"],
  },
  {
    key: "advisor",
    label: "Advisor",
    type: "text",
  },
]
