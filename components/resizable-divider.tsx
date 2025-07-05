"use client"

import { GripVertical } from "lucide-react"
import type React from "react"

interface ResizableDividerProps {
  onMouseDown: (e: React.MouseEvent) => void
  isResizing: boolean
  className?: string
}

export function ResizableDivider({ onMouseDown, isResizing, className = "" }: ResizableDividerProps) {
  return (
    <div
      className={`w-2 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex items-center justify-center transition-colors duration-200 relative group ${
        isResizing ? "bg-blue-500" : ""
      } ${className}`}
      onMouseDown={onMouseDown}
    >
      <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-white transition-colors duration-200" />
      {/* Resize indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <GripVertical className="h-4 w-4 text-white" />
      </div>
      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Drag to resize
      </div>
    </div>
  )
}
