import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "src/lib/utils.js"

const ToggleGroup = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex rounded-md border border-black bg-white",
      className
    )}
    {...props}
  />
))

const ToggleGroupItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black first:rounded-l-md last:rounded-r-md hover:bg-gray-100 data-[state=on]:bg-black data-[state=on]:text-white",
      className
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem } 