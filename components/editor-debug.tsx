"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bug, CheckCircle, XCircle } from "lucide-react"

interface EditorDebugProps {
  isOpen: boolean
  editingItem: any
  fields: any[]
  onToggle: () => void
}

export function EditorDebug({ isOpen, editingItem, fields, onToggle }: EditorDebugProps) {
  const [showDebug, setShowDebug] = useState(false)

  if (!showDebug) {
    return (
      <Button variant="outline" size="sm" onClick={() => setShowDebug(true)} className="fixed bottom-4 right-4 z-50">
        <Bug className="h-4 w-4 mr-2" />
        Debug Editor
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Editor Debug Panel</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowDebug(false)}>
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span>Dialog Open:</span>
          {isOpen ? (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              True
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <XCircle className="h-3 w-3 mr-1" />
              False
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>Editing Item:</span>
          {editingItem ? (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Present
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <XCircle className="h-3 w-3 mr-1" />
              Null
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>Fields Count:</span>
          <Badge variant="outline">{fields.length}</Badge>
        </div>

        {editingItem && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
            <div className="font-medium mb-1">Current Item:</div>
            <pre className="whitespace-pre-wrap">{JSON.stringify(editingItem, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
