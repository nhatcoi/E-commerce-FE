import { useState } from "react";
import { 
    useGetOrdersQuery, 
    useUpdateOrderStatusMutation,
    useCancelOrderMutation,
    useExportOrdersQuery 
} from "src/store/orderApi";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "src/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";
import { DatePickerWithRange } from "src/components/ui/date-range-picker";
import { LoadingSpinner } from "src/components/ui/loading-spinner";
import { Error } from "src/components/ui/error";
import { 
    Search, 
    Filter,
    Eye,
    Edit,
    XCircle,
    Download,
    Mail
} from "lucide-react";

const ORDER_STATUS = {
    'pending': { label: 'Pending', variant: 'secondary' },
    'processing': { label: 'Processing', variant: 'warning' },
    'shipped': { label: 'Shipped', variant: 'info' },
    'delivered': { label: 'Delivered', variant: 'success' },
    'canceled': { label: 'Canceled', variant: 'destructive' }
};

const PAYMENT_METHODS = [
    { value: 'all', label: 'All Methods' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
];

export default function OrdersDashboard() {
    // State
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
    const [dateRange, setDateRange] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    // RTK Query hooks
    const [updateStatus] = useUpdateOrderStatusMutation();
    const [cancelOrder] = useCancelOrderMutation();
    const { data: orders = [], isLoading, error } = useGetOrdersQuery({
        search,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
        paymentMethod: selectedPaymentMethod !== "all" ? selectedPaymentMethod : undefined,
        startDate: dateRange?.from,
        endDate: dateRange?.to
    });

    // Filter orders based on search and filters
    const filteredOrders = orders.filter(order => {
        const matchesSearch = !search || 
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customerName.toLowerCase().includes(search.toLowerCase());
        
        const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
        const matchesPayment = selectedPaymentMethod === "all" || order.paymentMethod === selectedPaymentMethod;
        
        const matchesDate = !dateRange?.from || !dateRange?.to || 
            (new Date(order.date) >= dateRange.from && new Date(order.date) <= dateRange.to);
        
        return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });

    // Handlers
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await updateStatus({ id: orderId, status: newStatus }).unwrap();
            toast({
                title: "Order Updated",
                description: `Order status has been updated to ${ORDER_STATUS[newStatus].label}`,
                variant: "success",
            });
        } catch (error) {
            toast({
                title: "Update Failed",
                description: error.message || "Failed to update order status",
                variant: "destructive",
            });
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId).unwrap();
            toast({
                title: "Order Cancelled",
                description: "Order has been cancelled successfully",
                variant: "success",
            });
        } catch (error) {
            toast({
                title: "Cancellation Failed",
                description: error.message || "Failed to cancel order",
                variant: "destructive",
            });
        }
    };

    const handleExportOrders = () => {
        // Implementation for exporting orders to CSV/Excel
        console.log("Exporting orders...");
    };

    if (isLoading) {
        return <LoadingSpinner fullScreen text="Loading orders..." />;
    }

    // if (error) {
    //     return <Error title="Failed to load orders" message={error.message} />;
    // }

    return (
        <div className="container py-10 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">
                        Manage and track all orders
                    </p>
                </div>
                <Button onClick={handleExportOrders} className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search orders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Status Filter */}
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                {Object.entries(ORDER_STATUS).map(([value, { label }]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Payment Method Filter */}
                        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Payment Method" />
                            </SelectTrigger>
                            <SelectContent>
                                {PAYMENT_METHODS.map(method => (
                                    <SelectItem key={method.value} value={method.value}>
                                        {method.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Date Range Picker */}
                        <DatePickerWithRange
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>{order.email}</div>
                                            <div className="text-sm text-muted-foreground">{order.phone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{format(new Date(order.date), 'MMM d, yyyy')}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={ORDER_STATUS[order.status].variant}>
                                            {ORDER_STATUS[order.status].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.paymentMethod}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleCancelOrder(order.id)}
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Order Details Dialog */}
            <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">Customer Information</h3>
                                    <div className="space-y-1 text-sm">
                                        <p>{selectedOrder.customerName}</p>
                                        <p>{selectedOrder.email}</p>
                                        <p>{selectedOrder.phone}</p>
                                        <p>{selectedOrder.address}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Order Summary</h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span>Order ID:</span>
                                            <span>{selectedOrder.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span>{format(new Date(selectedOrder.date), 'PPP')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Status:</span>
                                            <Badge variant={ORDER_STATUS[selectedOrder.status].variant}>
                                                {ORDER_STATUS[selectedOrder.status].label}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Payment Method:</span>
                                            <span>{selectedOrder.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-medium mb-2">Order Items</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedOrder.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Order Totals */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>${selectedOrder.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${selectedOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Status Update and Actions */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <div className="flex items-center gap-4">
                                    <Select 
                                        value={selectedOrder.status}
                                        onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Update Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(ORDER_STATUS).map(([value, { label }]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Customer
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <Download className="w-4 h-4" />
                                        Download Invoice
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}