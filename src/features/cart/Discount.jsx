import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useSelector} from "react-redux";

// Shadcn components
import {Button} from "src/components/ui/button.jsx";
import {Input} from "src/components/ui/input.jsx";
import {Label} from "src/components/ui/label.jsx";
import {Alert, AlertDescription} from "src/components/ui/alert.jsx";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "src/components/ui/collapsible.jsx";

// Icons
import {ChevronDown, ChevronUp, X, CheckCircle, AlertCircle, Tag} from "lucide-react";

const Discount = ({onDiscountApplied}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const [message, setMessage] = useState(null);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    // In a real application, you'd fetch these from your backend
    // For this example, we'll use a static list
    const availableDiscounts = [
        {code: "JACKIE_10", type: "percentage", value: 10, description: "10% off your first order"},
        {code: "JACKIE_FREESHIP", type: "shipping", value: 0, description: "Free shipping on any order"},
        {code: "OGGYTEAM", type: "fixed", value: 20, description: "$20 off orders over $100"},
    ];

    // Reset message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Apply discount logic
    const applyDiscount = () => {
        if (!code.trim()) {
            setMessage({type: "error", text: "Please enter a discount code"});
            return;
        }

        setIsApplying(true);

        // Simulate API call with timeout
        setTimeout(() => {
            const normalizedCode = code.trim().toUpperCase();
            const discount = availableDiscounts.find(d => d.code === normalizedCode);

            if (discount) {
                setAppliedDiscount(discount);
                onDiscountApplied(discount);
                setMessage({
                    type: "success",
                    text: `${discount.description} applied successfully!`
                });
                setCode("");
                setIsOpen(false);
            } else {
                setMessage({type: "error", text: "Invalid discount code"});
            }

            setIsApplying(false);
        }, 800); // Simulate network delay
    };

    // Remove applied discount
    const removeDiscount = () => {
        setAppliedDiscount(null);
        onDiscountApplied(null);
        setMessage({type: "info", text: "Discount code removed"});
    };

    return (
        <div className="space-y-3">
            {/* Applied discount display */}
            <AnimatePresence>
                {appliedDiscount && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        <div
                            className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-md p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600"/>
                                <div>
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {appliedDiscount.code}
                  </span>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                                        {appliedDiscount.description}
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 rounded-full"
                                onClick={removeDiscount}
                            >
                                <X className="h-3 w-3"/>
                                <span className="sr-only">Remove discount</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error or success message */}
            <AnimatePresence>
                {message && !appliedDiscount && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                    >
                        <Alert
                            variant={message.type === "error" ? "destructive" : "default"}
                            className={`py-2 ${message.type === "success" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" : ""}`}
                        >
                            <AlertDescription className="flex items-center gap-2 text-xs">
                                {message.type === "error" ? (
                                    <AlertCircle className="h-3.5 w-3.5"/>
                                ) : message.type === "success" ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600"/>
                                ) : (
                                    <Tag className="h-3.5 w-3.5"/>
                                )}
                                {message.text}
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Discount code input */}
            {!appliedDiscount && (
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="border border-border/60 rounded-md"
                >
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex w-full justify-between p-3 h-auto text-sm font-normal hover:bg-transparent hover:text-primary"
                        >
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-muted-foreground"/>
                                <span>Apply discount code</span>
                            </div>
                            {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground"/>
                            ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground"/>
                            )}
                        </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div className="p-3 pt-0 space-y-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="discountCode" className="text-xs">
                                    Enter your discount code
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="discountCode"
                                        placeholder="Discount code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="h-8 text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                applyDiscount();
                                            }
                                        }}
                                    />
                                    <Button
                                        className="h-8 text-xs px-3"
                                        disabled={isApplying || !code.trim()}
                                        onClick={applyDiscount}
                                    >
                                        {isApplying ? "Applying..." : "Apply"}
                                    </Button>
                                </div>
                            </div>

                            {/* Example discount codes */}
                            <div className="pt-1 pb-1">
                                <p className="text-xs text-muted-foreground">Try these demo codes: JACKIE_10,
                                    JACKIE_FREESHIP, OGGYTEAM</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            )}
        </div>
    );
};

export default Discount;