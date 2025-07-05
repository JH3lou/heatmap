"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X } from "lucide-react"

export interface FieldConfig {
  key: string
  label: string
  type: "text" | "number" | "select"
  options?: string[]
  step?: string
}

export interface DataTableEditorProps<T> {
  isOpen: boolean
  onClose: () => void
  item: T | null
  onSave: (item: T) => void
  fields: FieldConfig[]
  title?: string
}

export function DataTableEditor<T extends Record<string, any>>({
  isOpen,
  onClose,
  item,
  onSave,
  fields,
  title = "Edit Item",
}: DataTableEditorProps<T>) {
  const [editingItem, setEditingItem] = useState<T | null>(null)

  // Sync editingItem with item prop when dialog opens
  useEffect(() => {
    if (isOpen && item) {
      setEditingItem({ ...item })
    }
  }, [isOpen, item])

  const handleSave = () => {
    if (editingItem) {
      onSave(editingItem)
      onClose()
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    onClose()
  }

  const updateField = (key: string, value: any) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [key]: value })
    }
  }

  // Don't render if no item is being edited
  if (!editingItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.key} className="text-right">
                {field.label}
              </Label>
              {field.type === "select" ? (
                <Select
                  value={editingItem[field.key]?.toString() || ""}
                  onValueChange={(value) => updateField(field.key, value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.key}
                  type={field.type}
                  step={field.step}
                  value={editingItem[field.key]?.toString() || ""}
                  onChange={(e) =>
                    updateField(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                  }
                  className="col-span-3"
                  placeholder={`Enter ${field.label}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
