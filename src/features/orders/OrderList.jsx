import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader } from "src/components/ui/card.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { Package, ShoppingCart } from "lucide-react";
import { Button } from "src/components/ui/button.jsx";
import { toast } from "src/components/ui/use-toast.js";
import OrderDetail from "./OrderDetail.jsx";
import api from "src/config/api.js";
// import orderService from "src/services/orderService.js";

const OrderList = ({ status, searchQuery }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Use refs to track loading state and prevent duplicate requests
    const loadingRef = useRef(false);
    const observer = useRef(null);
    const lastOrderElementRef = useRef(null);

    const handleRepurchase = async (e, orderId) => {
        e.stopPropagation();
        toast({
            title: "Repurchase Initiated",
            description: "Repurchase process started for order " + orderId,
            variant: "default"
        });
    }

    const handleReturnOrder = async (e, orderId) => {
        e.stopPropagation();

        toast({
            title: "Return Initiated",
            description: "Return process started for order " + orderId,
            variant: "default"
        });
        // Update the order status in the local state
        try {
            setLoading(true);
            await api.put(`/orders/${orderId}/return`);

            // Update the order status in the local state
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId
                        ? { ...order, status: 'returns' }
                        : order
                )
            );

            toast({
                title: "Order Returned",
                description: "Your order has been returned successfully.",
                variant: "default"
            });
        } catch (error) {
            console.error('Error returning order:', error);
            toast({
                title: "Error",
                description: "Failed to return order. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }

    const handleCancelOrder = async (e, orderId) => {
        e.stopPropagation();
        try {
            setLoading(true);
            await api.put(`/orders/${orderId}/cancel`);
            
            // Update the order status in the local state
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: 'cancelled' }
                        : order
                )
            );

            toast({
                title: "Order Cancelled",
                description: "Your order has been cancelled successfully.",
                variant: "default"
            });
        } catch (error) {
            console.error('Error cancelling order:', error);
            toast({
                title: "Error",
                description: "Failed to cancel order. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleContinuePayment = async (e, orderId) => {
        e.stopPropagation();
        try {
            setLoading(true);
            const response = await api.get(`/orders/${orderId}/payment-url`);
            
            if (response.data?.paymentUrl) {
                // Redirect to payment gateway
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error('Payment URL not found');
            }
        } catch (error) {
            console.error('Error continuing payment:', error);
            toast({
                title: "Error",
                description: "Failed to process payment. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = useCallback(async (pageNumber) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const response = await api.get(`/orders`, {
                params: {
                    status: status === 'all' ? undefined : status,
                    page: pageNumber,
                    size: 10,
                }
            });
            
            const newOrders = response.data.data || [];
            
            setOrders(prev => {
                // If it's the first page, replace the array
                if (pageNumber === 1) return newOrders;
                // Otherwise append new orders
                return [...prev, ...newOrders];
            });

            setHasMore(newOrders.length > 0);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders. Please try again later.');
            setHasMore(false);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [status]);

    // Reset when status changes
    useEffect(() => {
        setOrders([]);
        setPage(1);
        setHasMore(true);
        setError(null);
        fetchOrders(1);
    }, [status, fetchOrders]);

    // Intersection Observer setup
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 0.1,
        };

        observer.current = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && hasMore && !loadingRef.current) {
                setPage(prev => prev + 1);
            }
        }, options);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore]);

    // Fetch when page changes
    useEffect(() => {
        if (page > 1) {
            fetchOrders(page);
        }
    }, [page, fetchOrders]);

    // Update last element observer
    useEffect(() => {
        if (lastOrderElementRef.current) {
            observer.current.disconnect();
        }
        
        if (hasMore && !loading) {
            const lastElement = document.querySelector('.order-card:last-child');
            if (lastElement) {
                lastOrderElementRef.current = lastElement;
                observer.current.observe(lastElement);
            }
        }
    }, [orders, hasMore, loading]);

    const getStatusBadgeColor = (orderStatus) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            returns: "bg-purple-100 text-purple-800",
        };
        return colors[orderStatus] || "bg-gray-100 text-gray-800";
    };

    const filteredOrders = orders.filter((order) => {
        if (!order) return false;

        const matchesSearch =
            searchQuery === "" ||
            order.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

        return matchesSearch;
    });

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    // Content to render based on state
    const renderContent = () => {
        if (error && orders.length === 0) {
            return (
                <div className="flex items-center justify-center h-[200px] text-red-500">
                    {error}
                </div>
            );
        }

        if (filteredOrders.length === 0 && !loading) {
            return (
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                    No orders found
                </div>
            );
        }

        return (
            <div className="space-y-4 transition-all duration-200">
                {filteredOrders.map((order, index) => (
                    <Card
                        key={order.id}
                        className={`order-card shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 ${
                            index === filteredOrders.length - 1 ? 'last-order' : ''
                        }`}
                        onClick={() => handleOrderClick(order)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center space-x-4">
                                <Package className="h-5 w-5 text-gray-500"/>
                                <div>
                                    <p className="font-medium">{order.shop}</p>
                                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                                </div>
                            </div>
                            <Badge className={getStatusBadgeColor(order.status)}>
                                {order.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start space-x-4 py-4 border-t"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        {/*<p className="text-sm text-gray-500">{item.description}</p>*/}
                                        <p className="text-sm text-gray-500">{item.attributes}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <ShoppingCart className="h-4 w-4 text-gray-500"/>
                                                <span className="text-sm">Qty: {item.quantity}</span>
                                            </div>
                                            <div className="text-right">
                                                {item.sellingPrice < item.originalPrice && (
                                                    <p className="text-sm line-through text-gray-500">
                                                        ${item.originalPrice.toFixed(2)}
                                                    </p>
                                                )}
                                                <p className="font-medium text-primary">
                                                    ${item.sellingPrice.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end gap-8 items-center border-t pt-4 mt-4">
                                <div className="flex gap-2">
                                    {['pending', 'paid', 'completed', 'cancelled'].includes(order.status.toLowerCase()) && (
                                        <>
                                            {order.status.toLowerCase() === 'pending' && (
                                                <>
                                                    <Button
                                                        variant="destructive"
                                                        size="lg"
                                                        className="text-sm"
                                                        onClick={(e) => handleContinuePayment(e, order.id)}
                                                    >
                                                        Payment
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="lg"
                                                        className="text-sm bg-white text-black border border-black shadow-none hover:bg-gray-100"
                                                        onClick={(e) => handleCancelOrder(e, order.id)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                            {['paid', 'completed'].includes(order.status.toLowerCase()) && (
                                                <Button
                                                    variant="default"
                                                    size="lg"
                                                    className="text-sm bg-white text-black border border-black shadow-none hover:bg-gray-100"
                                                    onClick={(e) => handleReturnOrder(e, order.id)}
                                                >
                                                    Return
                                                </Button>
                                            )}
                                            {['cancelled'].includes(order.status.toLowerCase()) && (
                                                <Button
                                                    variant="destructive"
                                                    size="lg"
                                                    className="text-sm"
                                                    onClick={(e) => handleRepurchase(e, order.id)}
                                                >
                                                    Repurchase
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Order Total</p>
                                    <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className="relative min-h-[400px] transition-all duration-200">
            {/* Main content with smooth transitions */}
            <div className={`space-y-6 transition-opacity duration-200 ${loading && orders.length === 0 ? 'opacity-50' : 'opacity-100'}`}>
                {renderContent()}
            </div>

            {/* Loading overlay */}
            {loading && (
                <div className={`absolute inset-0 flex items-center justify-center ${orders.length > 0 ? 'bg-white/50' : ''}`}>
                    <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}

            {/* End of list indicator */}
            {!hasMore && orders.length > 0 && (
                <div className="text-center py-6 text-gray-400 text-sm">
                    No more orders to load
                </div>
            )}

            {/* Order detail modal */}
            <OrderDetail
                order={selectedOrder}
                open={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
};

export default OrderList;