import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardHeader } from "src/components/ui/card.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { Package, ShoppingCart } from "lucide-react";
import { Button } from "src/components/ui/button.jsx";
import { toast } from "src/components/ui/use-toast.js";
import OrderDetail from "./OrderDetail.jsx";
import {
    useGetOrdersQuery,
    useCancelOrderMutation,
} from "src/store/orderApi";
import {stringCompare} from "src/utils/utils.js";

// Constants cho order list
const CONSTANTS = {
    PAGE_SIZE: 10,
    SEARCH_DEBOUNCE_TIME: 500,
    INFINITE_SCROLL_MARGIN: '100px',
    MIN_SEARCH_LENGTH: 2
};

// Set color cho các status đơn hàng
const STATUS_BADGE_COLORS = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    returns: "bg-purple-100 text-purple-800",
};

// Status đơn hàng
const ORDER_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ALL: 'all'
};

// UI text constants
const UI_TEXT = {
    // Button labels
    BUTTONS: {
        PAY: 'Pay now',
        CANCEL: 'Cancel',
        RETURN: 'Return',
        REPURCHASE: 'Buy again'
    },
    // Order info
    ORDER: {
        CODE_PREFIX: 'Order ID: ',
        TOTAL_LABEL: 'Total',
        QUANTITY_PREFIX: 'Qty: ',
        NO_ORDERS: 'No orders found',
        NO_MORE_ORDERS: 'No more orders',
        ERROR_LOADING: 'Cannot load orders'
    },
    // Toast messages
    TOAST: {
        REPURCHASE_TITLE: 'Repurchase started',
        REPURCHASE_DESC: 'Repurchase process for order {0} has been initiated',
        FEATURE_WIP_TITLE: 'Feature in development',
        FEATURE_WIP_DESC: 'This feature is currently under development',
        ORDER_CANCELLED_TITLE: 'Order cancelled',
        ORDER_CANCELLED_DESC: 'Your order has been successfully cancelled',
        ERROR_TITLE: 'Error',
        ERROR_CANCEL_DESC: 'Cannot cancel order. Please try again.'
    }
};

const OrderList = ({ status, searchQuery }) => {
    
    // Các state UI
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [page, setPage] = useState(0);

    // all orders
    const [allOrders, setAllOrders] = useState([]);

    // Ref cho infinite scroll
    const observerRef = useRef(null);

    // Tạo debounce cho searchQuery để tránh quá nhiều request
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, CONSTANTS.SEARCH_DEBOUNCE_TIME);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset page khi searchQuery thay đổi
    useEffect(() => {
        setPage(0);
        setAllOrders([]);
    }, [debouncedSearch]);

    // Data từ RTK Query
    const {
        data: ordersData,
        isLoading,
        isFetching,
        error
    } = useGetOrdersQuery({
        status: status === ORDER_STATUS.ALL ? undefined : status,
        page,
        size: CONSTANTS.PAGE_SIZE,
        search: debouncedSearch || undefined
    }, {
        skip: debouncedSearch.length === 1
    });

    // Hook mutation để hủy đơn hàng
    const [cancelOrder] = useCancelOrderMutation();

    // Cập nhật danh sách tất cả đơn hàng khi có dữ liệu mới
    useEffect(() => {
        if (ordersData?.data && Array.isArray(ordersData.data)) {
            if (page === 0) {
                setAllOrders(ordersData.data);
            } else {
                // Thêm đơn hàng mới vào danh sách hiện có, tránh trùng lặp
                setAllOrders(prev => {
                    const newOrderIds = new Set(ordersData.data.map(order => order.id));

                    // Giữ lại những đơn hàng cũ không có trong dữ liệu mới
                    const filteredPrev = prev.filter(order => !newOrderIds.has(order.id));

                    // Nối với dữ liệu mới
                    return [...filteredPrev, ...ordersData.data];
                });
            }
        }
    }, [ordersData?.data, page]);

    // Xử lý các hành động trên đơn hàng
    const handleRepurchase = useCallback(async (e, orderId) => {
        e.stopPropagation();
        toast({
            title: UI_TEXT.TOAST.REPURCHASE_TITLE,
            description: UI_TEXT.TOAST.REPURCHASE_DESC.replace('{0}', orderId),
            variant: "default"
        });
    }, []);

    const handleReturnOrder = useCallback(async (e, orderId) => {
        e.stopPropagation();
        toast({
            title: UI_TEXT.TOAST.FEATURE_WIP_TITLE,
            description: UI_TEXT.TOAST.FEATURE_WIP_DESC,
            variant: "default"
        });
    }, []);

    const handleCancelOrder = useCallback(async (e, orderId) => {
        e.stopPropagation();
        try {
            await cancelOrder(orderId).unwrap();
            toast({
                title: UI_TEXT.TOAST.ORDER_CANCELLED_TITLE,
                description: UI_TEXT.TOAST.ORDER_CANCELLED_DESC,
                variant: "default"
            });
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
            toast({
                title: UI_TEXT.TOAST.ERROR_TITLE,
                description: UI_TEXT.TOAST.ERROR_CANCEL_DESC,
                variant: "destructive"
            });
        }
    }, [cancelOrder]);

    const handleContinuePayment = useCallback((e, orderId) => {
        e.stopPropagation();
        toast({
            title: UI_TEXT.TOAST.FEATURE_WIP_TITLE,
            description: UI_TEXT.TOAST.FEATURE_WIP_DESC,
            variant: "default"
        });
    }, []);

    // Callback ref cho phần tử cuối cùng - cách tốt hơn để áp dụng IntersectionObserver
    const lastOrderElementRef = useCallback(node => {
        if (isLoading || isFetching) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            // Nếu phần tử cuối cùng hiển thị và có trang tiếp theo, tải thêm dữ liệu
            if (entries[0]?.isIntersecting && ordersData?.pagination?.hasNextPage) {
                setPage(prevPage => prevPage + 1);
            }
        }, { rootMargin: CONSTANTS.INFINITE_SCROLL_MARGIN });

        if (node) observerRef.current.observe(node);
    }, [isLoading, isFetching, ordersData?.pagination?.hasNextPage, page]);

    // Xử lý khi click vào đơn hàng
    const handleOrderClick = useCallback((order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    }, []);

    // Kiểm tra trạng thái đơn hàng
    const isOrderStatus = useCallback((order, statusArray) => {
        return statusArray.includes(order.status);
    }, []);

    // Render các nút hành động dựa trên trạng thái đơn hàng
    const renderActionButtons = useCallback((order) => {

        if ( stringCompare(order.status, ORDER_STATUS.PENDING) ) {
            return (
                <>
                    <Button
                        variant="destructive"
                        size="lg"
                        className="text-sm"
                        onClick={(e) => handleContinuePayment(e, order.id)}
                    >
                        {UI_TEXT.BUTTONS.PAY}
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        className="text-sm bg-white text-black border border-black shadow-none hover:bg-gray-100"
                        onClick={(e) => handleCancelOrder(e, order.id)}
                    >
                        {UI_TEXT.BUTTONS.CANCEL}
                    </Button>
                </>
            );
        }

        if ( stringCompare(order.status, ORDER_STATUS.PAID || ORDER_STATUS.COMPLETED ) ) {
            return (
                <Button
                    variant="default"
                    size="lg"
                    className="text-sm bg-white text-black border border-black shadow-none hover:bg-gray-100"
                    onClick={(e) => handleReturnOrder(e, order.id)}
                >
                    {UI_TEXT.BUTTONS.RETURN}
                </Button>
            );
        }

        if (stringCompare(order.status, ORDER_STATUS.CANCELLED)) {
            return (
                <Button
                    variant="destructive"
                    size="lg"
                    className="text-sm"
                    onClick={(e) => handleRepurchase(e, order.id)}
                >
                    {UI_TEXT.BUTTONS.REPURCHASE}
                </Button>
            );
        }

        return null;
    }, [handleContinuePayment, handleCancelOrder, handleReturnOrder, handleRepurchase, isOrderStatus]);

    // Render một mục sản phẩm trong đơn hàng
    const renderOrderItem = useCallback((item) => (
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
                <p className="text-sm text-gray-500">{item.attributes}</p>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">{UI_TEXT.ORDER.QUANTITY_PREFIX}{item.quantity}</span>
                    </div>
                    <div className="text-right">
                        {item.sellingPrice < item.originalPrice && (
                            <p className="text-sm line-through text-gray-500">
                                {item.originalPrice.toFixed(2)}₫
                            </p>
                        )}
                        <p className="font-medium text-primary">
                            {item.sellingPrice.toFixed(2)}₫
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ), []);

    // Render contents
    const renderContent = useCallback(() => {
        if (error && allOrders.length === 0) {
            return (
                <div className="flex items-center justify-center h-[200px] text-red-500">
                    {error.message || UI_TEXT.ORDER.ERROR_LOADING}
                </div>
            );
        }

        if (allOrders.length === 0 && !isLoading) {
            return (
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                    {UI_TEXT.ORDER.NO_ORDERS}
                </div>
            );
        }

        // Display
        return (
            <div className="space-y-4 transition-all duration-200">
                {allOrders.map((order, index) => (
                    <Card
                        key={order.id}
                        // Áp dụng ref cho phần tử cuối cùng
                        ref={index === allOrders.length - 1 ? lastOrderElementRef : null}
                        className="order-card shadow-sm cursor-pointer hover:shadow-md transition-all duration-200"
                        onClick={() => handleOrderClick(order)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center space-x-4">
                                <Package className="h-5 w-5 text-gray-500"/>
                                <div>
                                    <p className="font-medium">{order.shop}</p>
                                    <p className="text-sm text-gray-500">{UI_TEXT.ORDER.CODE_PREFIX}{order.id}</p>
                                </div>
                            </div>
                            <Badge className={STATUS_BADGE_COLORS[order.status] || "bg-gray-100 text-gray-800"}>
                                {order.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            {order.items?.map(renderOrderItem)}

                            {/* Footer đơn hàng: các nút hành động và tổng tiền */}
                            <div className="flex justify-end gap-8 items-center border-t pt-4 mt-4">
                                <div className="flex gap-2">
                                    {renderActionButtons(order)}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{UI_TEXT.ORDER.TOTAL_LABEL}</p>
                                    <p className="text-lg font-bold">{order.total.toFixed(2)}₫</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }, [allOrders, error, isLoading, lastOrderElementRef, handleOrderClick, renderOrderItem, renderActionButtons]);

    return (
        <div className="relative min-h-[400px] transition-all duration-200">
            {/* Nội dung chính */}
            <div className={`space-y-6 transition-opacity duration-200 ${(isLoading && allOrders.length === 0) ? 'opacity-50' : 'opacity-100'}`}>
                {renderContent()}
            </div>

            {/* Loading indicator */}
            {(isLoading || isFetching) && (
                <div className={`absolute inset-0 flex items-center justify-center ${allOrders.length > 0 ? 'bg-white/50 pointer-events-none' : ''}`}>
                    <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}

            {/* Thông báo không có thêm đơn hàng */}
            {!ordersData?.pagination?.hasNextPage && allOrders.length > 0 && !isLoading && !isFetching && (
                <div className="text-center py-6 text-gray-400 text-sm">
                    {UI_TEXT.ORDER.NO_MORE_ORDERS}
                </div>
            )}

            {/* Chi tiết đơn hàng */}
            <OrderDetail
                order={selectedOrder}
                open={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
};

export default OrderList;