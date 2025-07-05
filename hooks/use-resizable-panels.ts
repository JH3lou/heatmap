"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import type React from "react"

interface UseResizablePanelsProps {
  initialLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
}

export function useResizablePanels({
  initialLeftWidth = 33.33,
  minLeftWidth = 20,
  maxLeftWidth = 70,
}: UseResizablePanelsProps = {}) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialLeftWidth)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left

      // Calculate new width percentage with constraints
      let newWidthPercent = (mouseX / containerWidth) * 100
      newWidthPercent = Math.max(minLeftWidth, Math.min(maxLeftWidth, newWidthPercent))

      setLeftPanelWidth(newWidthPercent)
    },
    [isResizing, minLeftWidth, maxLeftWidth],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add global mouse event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const resetToDefault = useCallback(() => {
    setLeftPanelWidth(initialLeftWidth)
  }, [initialLeftWidth])

  return {
    leftPanelWidth,
    rightPanelWidth: 100 - leftPanelWidth - 0.5, // Subtract divider width
    isResizing,
    containerRef,
    handleMouseDown,
    resetToDefault,
  }
}
