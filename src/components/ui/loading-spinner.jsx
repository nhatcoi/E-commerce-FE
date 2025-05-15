import { cn } from "src/utils/utils.js";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ 
  className,
  size = "default",
  fullScreen = false,
  text,
  ...props 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn("animate-spin", sizeClasses[size], className)} {...props} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export { LoadingSpinner };