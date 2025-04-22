import { cn } from "src/lib/utils";
import { Check } from "lucide-react";

export const Steps = ({ steps, currentStep, className }) => {
    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        {/* Step circle */}
                        <div className="relative">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2",
                                    currentStep > index
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : currentStep === index
                                        ? "border-primary text-primary"
                                        : "border-muted-foreground/30 text-muted-foreground"
                                )}
                            >
                                {currentStep > index ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span
                                className={cn(
                                    "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm",
                                    currentStep >= index
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {step.title}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "w-24 h-[2px] mx-2",
                                    currentStep > index
                                        ? "bg-primary"
                                        : "bg-muted-foreground/30"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}; 