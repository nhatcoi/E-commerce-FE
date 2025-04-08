import {Dialog, DialogContent, DialogHeader, DialogTitle} from "src/components/ui/dialog.jsx";
import {Badge} from "src/components/ui/badge.jsx";
import {Package, ShoppingCart, Truck, Calendar, Store} from "lucide-react";
import {ScrollArea} from "src/components/ui/scroll-area.jsx";

const OrderDetail = ({order, open, onClose}) => {
    if (!order) return null;

    const getStatusBadgeColor = (orderStatus) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            returns: "bg-purple-100 text-purple-800",
        };
        return colors[orderStatus] || "bg-gray-100 text-gray-800";
    };

    // Safe number formatting helper
    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                    <div className="space-y-6">
                        {/* Order Header Information */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-gray-500"/>
                                    <span className="font-medium">Order ID: {order.id}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-500"/>
                                    <span className="text-sm text-gray-500">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Store className="h-4 w-4 text-gray-500"/>
                                    <span className="text-sm text-gray-500">{order.shop}</span>
                                </div>
                            </div>
                            <Badge className={getStatusBadgeColor(order.status)}>
                                {order.status}
                            </Badge>
                        </div>

                        {/* Shipping Information (if available) */}
                        {order.shipping && (
                            <div className="border rounded-lg p-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Truck className="h-4 w-4 text-gray-500"/>
                                    <span className="font-medium">Shipping Information</span>
                                </div>
                                <div className="text-sm text-gray-500 pl-6 space-y-1">
                                    <p>{order.shipping.address}</p>
                                    <p>Tracking Number: {order.shipping.trackingNumber}</p>
                                    <p>Carrier: {order.shipping.carrier}</p>
                                </div>
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="space-y-4">
                            <h3 className="font-medium">Order Items</h3>
                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start space-x-4 py-4 border-t"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                        <p className="text-sm text-gray-500">{item.attributes}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <ShoppingCart className="h-4 w-4 text-gray-500"/>
                                                <span className="text-sm">Qty: {item.quantity}</span>
                                            </div>
                                            <div className="text-right">
                                                {item.sellingPrice < item.originalPrice && (
                                                    <p className="text-sm line-through text-gray-500">
                                                        ${formatPrice(item.originalPrice)}
                                                    </p>
                                                )}
                                                <p className="font-medium text-primary">
                                                    ${formatPrice(item.sellingPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t pt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${formatPrice(order.total)}</span>
                                </div>
                                {order.shipping && (
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${formatPrice(order.shipping.cost)}</span>
                                    </div>
                                )}
                                {order.discount && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-${formatPrice(order.discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>${formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetail; 