import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Shadcn components
import { Input } from "src/components/ui/input.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Alert, AlertDescription } from "src/components/ui/alert.jsx";

// Icons
import { TagIcon, CheckCircle, XCircle, Loader2 } from "lucide-react";

// You'll need to create this action in your cart slice
// import { applyDiscount } from "../store/slices/cart/cartSlice.js";

const Discount = ({ onDiscountApplied }) => {
    const dispatch = useDispatch();
    const [discountCode, setDiscountCode] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const [discountStatus, setDiscountStatus] = useState(null); // null, 'success', 'error'
    const [discountMessage, setDiscountMessage] = useState("");

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) return;

        setIsApplying(true);
        setDiscountStatus(null);

        try {
            // This would be replaced with your actual discount application logic
            // For example: const result = await dispatch(applyDiscount(discountCode)).unwrap();

            // Simulating API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demonstration, we'll simulate different responses based on the code
            if (discountCode.toUpperCase() === "SAVE10") {
                setDiscountStatus("success");
                setDiscountMessage("10% discount applied successfully!");
                onDiscountApplied({ code: discountCode, type: "percentage", value: 10 });
            } else if (discountCode.toUpperCase() === "FREESHIP") {
                setDiscountStatus("success");
                setDiscountMessage("Free shipping applied successfully!");
                onDiscountApplied({ code: discountCode, type: "shipping", value: 100 });
            } else {
                setDiscountStatus("error");
                setDiscountMessage("Invalid or expired discount code.");
                onDiscountApplied(null);
            }
        } catch (error) {
            setDiscountStatus("error");
            setDiscountMessage("Error applying discount. Please try again.");
            onDiscountApplied(null);
        } finally {
            setIsApplying(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleApplyDiscount();
        }
    };

    return (
        <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
                <TagIcon className="w-4 h-4" />
                Apply Discount Code
            </h4>

            <div className="flex space-x-2">
                <Input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter code"
                    className="flex-1"
                    disabled={isApplying}
                />
                <Button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode.trim() || isApplying}
                    variant="secondary"
                >
                    {isApplying ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "Apply"
                    )}
                </Button>
            </div>

            {discountStatus && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Alert variant={discountStatus === "success" ? "default" : "destructive"} className="py-2">
                        <AlertDescription className="flex items-center gap-2 text-sm">
                            {discountStatus === "success" ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                <XCircle className="w-4 h-4" />
                            )}
                            {discountMessage}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}
        </div>
    );
};

export default Discount;