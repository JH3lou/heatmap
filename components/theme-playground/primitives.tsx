"use client"

/**
 * Three interchangeable implementations of the same shadcn-styled primitives,
 * one per headless base library. They render identically (same Tailwind token
 * classes) but are powered by different primitive engines, so the Theme
 * Playground can demonstrate that the shadcn look is base-agnostic.
 */

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Radix (the library the component actually ships on)
import { Button as RadixButton } from "@/components/ui/button"
import {
  Select as RxSelect,
  SelectContent as RxSelectContent,
  SelectItem as RxSelectItem,
  SelectTrigger as RxSelectTrigger,
  SelectValue as RxSelectValue,
} from "@/components/ui/select"

// Base UI
import { Select as BaseSelect } from "@base-ui-components/react/select"

// React Aria
import {
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  Button as AriaButton,
  Popover as AriaPopover,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from "react-aria-components"

export type ButtonVariant = "default" | "secondary" | "outline" | "destructive" | "ghost"

export interface PlaygroundButtonProps {
  variant?: ButtonVariant
  children: React.ReactNode
  onClick?: () => void
  className?: string
  "data-slot"?: string
  "aria-label"?: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface PlaygroundSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  "aria-label"?: string
}

export type BaseId = "radix" | "base-ui" | "react-aria"

export interface PrimitiveSet {
  id: BaseId
  name: string
  pkg: string
  docsUrl: string
  Button: React.FC<PlaygroundButtonProps>
  Select: React.FC<PlaygroundSelectProps>
}

// --- Shared token classes (identical across all three backends) -------------

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
}

const buttonClass = (variant: ButtonVariant = "default", className?: string) =>
  cn(BUTTON_BASE, BUTTON_VARIANT[variant], className)

const TRIGGER_CLASS =
  "flex h-9 w-[200px] items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring data-[placeholder]:text-muted-foreground"

const CONTENT_CLASS =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md p-1"

const ITEM_CLASS =
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[selected]:font-medium"

// --- Radix -----------------------------------------------------------------

const radix: PrimitiveSet = {
  id: "radix",
  name: "Radix UI",
  pkg: "@radix-ui/react-select",
  docsUrl: "https://www.radix-ui.com/primitives",
  Button: ({ variant = "default", children, onClick, className, ...rest }) => (
    <RadixButton variant={variant} onClick={onClick} className={className} {...rest}>
      {children}
    </RadixButton>
  ),
  Select: ({ value, onValueChange, options, placeholder, ...rest }) => (
    <RxSelect value={value} onValueChange={onValueChange}>
      <RxSelectTrigger className="w-[200px]" data-base="radix" {...rest}>
        <RxSelectValue placeholder={placeholder} />
      </RxSelectTrigger>
      <RxSelectContent>
        {options.map((o) => (
          <RxSelectItem key={o.value} value={o.value}>
            {o.label}
          </RxSelectItem>
        ))}
      </RxSelectContent>
    </RxSelect>
  ),
}

// --- Base UI ---------------------------------------------------------------

const baseUi: PrimitiveSet = {
  id: "base-ui",
  name: "Base UI",
  pkg: "@base-ui-components/react",
  docsUrl: "https://base-ui.com",
  Button: ({ variant = "default", children, onClick, className, ...rest }) => (
    <button type="button" onClick={onClick} className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  ),
  Select: ({ value, onValueChange, options, placeholder, ...rest }) => (
    <BaseSelect.Root value={value} onValueChange={(v) => onValueChange(v as string)}>
      <BaseSelect.Trigger className={TRIGGER_CLASS} data-base="base-ui" {...rest}>
        <BaseSelect.Value>
          {(val: string) => options.find((o) => o.value === val)?.label ?? placeholder}
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} className="z-50">
          <BaseSelect.Popup className={CONTENT_CLASS}>
            {options.map((o) => (
              <BaseSelect.Item key={o.value} value={o.value} className={ITEM_CLASS}>
                <BaseSelect.ItemIndicator className="absolute right-2">
                  <Check className="h-4 w-4" />
                </BaseSelect.ItemIndicator>
                <BaseSelect.ItemText>{o.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  ),
}

// --- React Aria ------------------------------------------------------------

const reactAria: PrimitiveSet = {
  id: "react-aria",
  name: "React Aria",
  pkg: "react-aria-components",
  docsUrl: "https://react-spectrum.adobe.com/react-aria",
  Button: ({ variant = "default", children, onClick, className, ...rest }) => (
    <AriaButton onPress={onClick} className={buttonClass(variant, className)} {...rest}>
      {children}
    </AriaButton>
  ),
  Select: ({ value, onValueChange, options, placeholder, ...rest }) => (
    <AriaSelect
      selectedKey={value}
      onSelectionChange={(key) => onValueChange(String(key))}
      aria-label={rest["aria-label"] ?? placeholder ?? "Select"}
    >
      <AriaButton className={TRIGGER_CLASS} data-base="react-aria">
        <AriaSelectValue>
          {({ selectedText, isPlaceholder }) => (isPlaceholder ? placeholder : selectedText)}
        </AriaSelectValue>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </AriaButton>
      <AriaPopover className={cn(CONTENT_CLASS, "w-[200px]")}>
        <AriaListBox className="outline-none">
          {options.map((o) => (
            <AriaListBoxItem key={o.value} id={o.value} textValue={o.label} className={ITEM_CLASS}>
              {o.label}
            </AriaListBoxItem>
          ))}
        </AriaListBox>
      </AriaPopover>
    </AriaSelect>
  ),
}

export const PRIMITIVE_SETS: Record<BaseId, PrimitiveSet> = {
  radix,
  "base-ui": baseUi,
  "react-aria": reactAria,
}

export const BASE_ORDER: BaseId[] = ["radix", "base-ui", "react-aria"]
