import { useGetOrderByIdQuery } from "src/store/orderApi.js";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card.jsx";
import { Button } from "src/components/ui/button.jsx";
import { Separator } from "src/components/ui/separator.jsx";
import { CheckCircle2, Printer } from "lucide-react";

// eslint-disable-next-line react/prop-types
const OrderConfirmation = ({ orderId }) => {
    const { data, isLoading, error } = useGetOrderByIdQuery(orderId);
    const orderData = data?.data || {};

    const handlePrintOrder = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading order details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-destructive">
                <p>Failed to load order details. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <Card className="mb-8">
                <CardHeader className="text-center pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-primary">Order Confirmed!</CardTitle>
                    <p className="text-muted-foreground mt-2">
                        Thank you for your order. We'll send you shipping confirmation soon.
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Order Info */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Order Number:</span>
                            <span className="font-medium">{orderData.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">
                                {new Date(orderData.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    {/* Items */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Order Items</h3>
                        {orderData.items?.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <div>
                                    <span className="font-medium">{item.product.name}</span>
                                    {item.selectedAttributes && (
                                        <span className="text-muted-foreground ml-2">
                                            ({Object.values(item.selectedAttributes)
                                                .map(attr => attr.attributeValue)
                                                .join(", ")})
                                        </span>
                                    )}
                                    <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${orderData.subtotal?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>${orderData.shipping?.toFixed(2)}</span>
                        </div>
                        {orderData.discount > 0 && (
                            <div className="flex justify-between text-sm text-primary">
                                <span>Discount</span>
                                <span>-${orderData.discount?.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-medium pt-2">
                            <span>Total</span>
                            <span className="text-lg">${orderData.total?.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button variant="outline" onClick={handlePrintOrder} className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print Order
                </Button>
            </div>
        </div>
    );
};

export default OrderConfirmation;