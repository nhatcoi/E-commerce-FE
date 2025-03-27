import * as React from "react"
import { cn } from "src/lib/utils.js"

const Tag = React.forwardRef(({ className, variant = "default", selected = false, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        {
          "bg-black text-white": selected,
          "bg-white text-black border border-gray-300": !selected,
          "hover:bg-gray-100": !selected && variant !== "static",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Tag.displayName = "Tag"

export { Tag } 