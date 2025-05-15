import React from "react";
import { cn } from "../../utils/utils.js";

const Tag = ({ 
  className, 
  children,
  selected = false,
  onClick,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors",
        selected 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tag }; 