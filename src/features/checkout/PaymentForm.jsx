import { motion } from "framer-motion";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { Checkbox } from "src/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import { CreditCard, CircleDollarSign, ShieldCheck, Loader2 } from "lucide-react";
import { usePaymentForm } from "./usePaymentForm";

const paymentMethods = [
    {
        id: "stripe",
        name: "Credit Card",
        description: "Pay with Visa, Mastercard by Stripe",
        icon: CircleDollarSign,
    }
];

const PaymentForm = ({ onSubmit, shippingData }) => {
    const {
        selectedMethod, setSelectedMethod,
        isLoading, handleSubmit, handleFormSubmit,
        register, errors, paymentStatus
    } = usePaymentForm({ onSubmit, shippingData });

    const renderPaymentMethodForm = () => {


        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-muted-foreground">
                You will be redirected to {selectedMethod} to complete your payment.
            </motion.div>
        );
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
                    <p className="text-muted-foreground text-center max-w-md">
                        Please wait while we process your payment. Do not close this window.
                    </p>
                    {paymentStatus === 'failed' && (
                        <div className="mt-6 text-red-500 font-medium">Payment failed. Please try again.</div>
                    )}
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Payment Method</h2>
                        <p className="text-muted-foreground">Choose your preferred payment method</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Select Payment Method</CardTitle>
                            <CardDescription>All transactions are secure and encrypted</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="credit-card" onValueChange={setSelectedMethod} className="space-y-4">
                                {paymentMethods.map((method) => (
                                    <div key={method.id} className="flex items-center space-x-4 rounded-lg border p-4">
                                        <RadioGroupItem value={method.id} id={method.id} />
                                        <Label htmlFor={method.id} className="flex flex-1 items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <method.icon className="w-5 h-5" />
                                                <div className="space-y-1">
                                                    <p className="font-medium">{method.name}</p>
                                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            {renderPaymentMethodForm()}
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-sm text-muted-foreground">Your payment information is secure</span>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSubmit(handleFormSubmit)} className="w-full md:w-auto" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                "Complete Order"
                            )}
                        </Button>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default PaymentForm;
