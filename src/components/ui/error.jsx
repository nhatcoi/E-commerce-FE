import { AlertTriangle } from "lucide-react";
import { cn } from "src/lib/utils.js";
import { Button } from "./button";

const Error = ({
  title = "Error",
  message = "Something went wrong. Please try again later.",
  action,
  actionText = "Try Again",
  className,
  fullScreen = false,
  ...props
}) => {
  const errorContent = (
    <div className="flex flex-col items-center justify-center text-center gap-4" {...props}>
      <div className="rounded-full bg-destructive/10 p-3">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{message}</p>
      </div>
      {action && (
        <Button variant="outline" onClick={action} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        className
      )}>
        {errorContent}
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center p-4", className)}>
      {errorContent}
    </div>
  );
};

export { Error };