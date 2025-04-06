import * as React from "react";

export const Switch = React.forwardRef(({ className, checked, onChange, ...props }, ref) => {
    return (
        <button
            ref={ref}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors 
        ${checked ? "bg-blue-500" : "bg-gray-300"} ${className}`}
            {...props}
        >
      <span
          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform 
          ${checked ? "translate-x-6" : "translate-x-0"}`}
      />
        </button>
    );
});

Switch.displayName = "Switch";
