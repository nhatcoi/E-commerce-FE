import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Input } from "src/components/ui/input";
import {Search, Filter, Download, RefreshCw, Edit, Trash2, Eye, CheckCircle, XCircle, MoreVertical} from "lucide-react";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardHeader } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import { Calendar } from "src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { toast } from "src/components/ui/use-toast";
import { useGetOrdersQuery} from "src/store/orderApi.js";
import {formatCurrency} from "src/utils/formatCurrency.js";
import {formatDateTime} from "src/utils/formatDate.js";

const CONSTANTS = {
    DEFAULT_STATUS: "all",
    PAGE_SIZE: 10,
    DATE_FORMAT: "yyyy-MM-dd",
    SEARCH_DEBOUNCE_TIME: 500,
    MIN_SEARCH_LENGTH: 2
};

/* UI text constants */
const UI_TEXT = {
    PAGE_TITLE: "Orders Dashboard",
    SEARCH_PLACEHOLDER: "Search by order ID, customer, or product",
    FILTER_LABEL: "Filters",
    EXPORT_LABEL: "Export",
    REFRESH_LABEL: "Refresh",
    DATE_RANGE: "Date Range",
    APPLY_FILTER: "Apply Filters",
    RESET_FILTER: "Reset",
    TOTAL_ORDERS: "Total Orders",
    REVENUE: "Revenue",
    PENDING_ORDERS: "Pending Orders",
    CANCELLED_ORDERS: "Cancelled Orders",
    NO_ORDERS: "No orders found",
    DATE_FROM: "From",
    DATE_TO: "To",
    VIEW_DETAILS: "View Details",
    EDIT_ORDER: "Edit Order",
    DELETE_ORDER: "Delete Order",
    APPROVE_ORDER: "Approve Order",
    REJECT_ORDER: "Reject Order",
    CHANGE_STATUS: "Change Status",
    CONFIRM_DELETE: "Confirm Delete",
    CONFIRM_DELETE_MESSAGE: "Are you sure you want to delete this order? This action cannot be undone.",
    CANCEL: "Cancel",
    DELETE: "Delete",
    ACTIONS: "Actions",
    CUSTOMER: "Customer",
    TOTAL: "Total",
    STATUS: "Status",
    DATE: "Date",
    ORDER_ID: "Order ID",
    SUCCESS_MESSAGE: "Operation completed successfully",
    ERROR_MESSAGE: "An error occurred. Please try again.",
    ORDER_STATUSES: {
        ALL: {
            value: "all",
            label: "All Orders"
        },
        PENDING: {
            value: "pending",
            label: "Pending"
        },
        PAID: {
            value: "paid",
            label: "Paid"
        },
        PROCESSING: {
            value: "processing",
            label: "Processing"
        },
        SHIPPED: {
            value: "shipped",
            label: "Shipped"
        },
        DELIVERED: {
            value: "delivered",
            label: "Delivered"
        },
        CANCELLED: {
            value: "cancelled",
            label: "Cancelled"
        },
        RETURNS: {
            value: "returns",
            label: "Returns"
        }
    }
};

/* status */
const ORDER_STATUSES = [
    UI_TEXT.ORDER_STATUSES.ALL,
    UI_TEXT.ORDER_STATUSES.PENDING,
    UI_TEXT.ORDER_STATUSES.PAID,
    UI_TEXT.ORDER_STATUSES.PROCESSING,
    UI_TEXT.ORDER_STATUSES.SHIPPED,
    UI_TEXT.ORDER_STATUSES.DELIVERED,
    UI_TEXT.ORDER_STATUSES.CANCELLED,
    UI_TEXT.ORDER_STATUSES.RETURNS,
];

// Set color cho các status đơn hàng
const STATUS_BADGE_COLORS = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
    returns: "bg-purple-100 text-purple-800",
};

// Statistical data
const DASHBOARD_STATS = {
    totalOrders: 156,
    totalRevenue: 24950.75,
    pendingOrders: 35,
    cancelledOrders: 12
};

const OrdersDashboard = () => {
    /* State search */
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    /* status hiện tại từ URL */
    const currentStatus = searchParams.get("status") || CONSTANTS.DEFAULT_STATUS;

    // Filter states
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    // Tạo debounce cho searchQuery để tránh quá nhiều request
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, CONSTANTS.SEARCH_DEBOUNCE_TIME);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // RTK Query hooks
    const { data, isLoading, error } = useGetOrdersQuery({
        status: currentStatus !== 'all' ? currentStatus : undefined,
        search: debouncedSearch || undefined,
        dateFrom: dateFrom ? format(dateFrom, CONSTANTS.DATE_FORMAT) : undefined,
        dateTo: dateTo ? format(dateTo, CONSTANTS.DATE_FORMAT) : undefined
    }, {
        skip: debouncedSearch.length === 1 // Skip query
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ordersData = data?.data || [];
    const totalOrders = data?.pagination?.totalItems ?? 0;


    // Simple filtering logic for search
    const filteredOrders = useMemo(() => {
        if (!ordersData) return [];

        let result = [...ordersData];

        return result;
    }, [ordersData, dateFrom, dateTo]);

    const handleTabChange = (value) => {
        setSearchParams({status: value});
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setDateFrom(null);
        setDateTo(null);
    };

    const handleExportData = () => {
        // TODO
    };

    const handleRefreshData = () => {
        // TODO
    };

    
    const handleOrderAction = async (orderId, action) => {
        try {
            switch (action) {
                case 'view':
                    break;
                    
                case 'edit':
                    break;
                    
                case 'approve':
                    break;
                    
                case 'reject':
                    break;
                default:
                    break;
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to perform action: ${error.message || "Unknown error"}`,
                variant: "destructive"
            });
        }
    };

    const handleDeleteOrder = (orderId) => {
       // TODO
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container py-8 mx-auto">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{UI_TEXT.PAGE_TITLE}</h1>
                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={handleRefreshData}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {UI_TEXT.REFRESH_LABEL}
                        </Button>
                        <Button variant="outline" onClick={handleExportData}>
                            <Download className="h-4 w-4 mr-2" />
                            {UI_TEXT.EXPORT_LABEL}
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">{UI_TEXT.TOTAL_ORDERS}</p>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">+12.5%</Badge>
                            </div>
                            <h3 className="text-3xl font-bold mt-2">{totalOrders}</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">{UI_TEXT.REVENUE}</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700">+8.2%</Badge>
                            </div>
                            <h3 className="text-3xl font-bold mt-2">{formatCurrency(DASHBOARD_STATS.totalRevenue)}</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">{UI_TEXT.PENDING_ORDERS}</p>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">+4.1%</Badge>
                            </div>
                            <h3 className="text-3xl font-bold mt-2">{DASHBOARD_STATS.pendingOrders}</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">{UI_TEXT.CANCELLED_ORDERS}</p>
                                <Badge variant="outline" className="bg-red-50 text-red-700">-2.3%</Badge>
                            </div>
                            <h3 className="text-3xl font-bold mt-2">{DASHBOARD_STATS.cancelledOrders}</h3>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-end">
                        {/* Search Input */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Date Range Filter */}
                        <div className="flex space-x-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="pl-3 text-left font-normal">
                                        {dateFrom ? (
                                            format(dateFrom, CONSTANTS.DATE_FORMAT)
                                        ) : (
                                            <span>{UI_TEXT.DATE_FROM}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dateFrom}
                                        onSelect={setDateFrom}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="pl-3 text-left font-normal">
                                        {dateTo ? (
                                            format(dateTo, CONSTANTS.DATE_FORMAT)
                                        ) : (
                                            <span>{UI_TEXT.DATE_TO}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dateTo}
                                        onSelect={setDateTo}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={handleResetFilters}>
                                {UI_TEXT.RESET_FILTER}
                            </Button>
                            <Button size="sm">
                                {UI_TEXT.APPLY_FILTER}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <Card className="bg-white shadow rounded-lg">
                    <CardHeader className="pb-2">
                        <Tabs value={currentStatus} onValueChange={handleTabChange} className="w-full">
                            <TabsList className="flex flex-wrap">
                                {ORDER_STATUSES.map((status) => (
                                    <TabsTrigger
                                        key={status.value}
                                        value={status.value}
                                        className="flex-1"
                                    >
                                        {status.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent>
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                {UI_TEXT.NO_ORDERS}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="border-b text-left">
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.ORDER_ID}</th>
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.CUSTOMER}</th>
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.DATE}</th>
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.TOTAL}</th>
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.STATUS}</th>
                                        <th className="px-4 py-3 text-sm font-medium text-gray-500">{UI_TEXT.ACTIONS}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-4">{order.id}</td>
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium">{order.customerName}</p>
                                                    <p className="text-sm text-gray-500">{order.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">{formatDateTime(order.orderDate)}</td>
                                            <td className="px-4 py-4 font-medium">{formatCurrency(order.total)}</td>
                                            <td className="px-4 py-4">
                                                <Badge className={STATUS_BADGE_COLORS[order.status] || "bg-gray-100 text-gray-800"}>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'view')}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            {UI_TEXT.VIEW_DETAILS}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'edit')}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            {UI_TEXT.EDIT_ORDER}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {order.status === 'pending' && (
                                                            <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'approve')}>
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                {UI_TEXT.APPROVE_ORDER}
                                                            </DropdownMenuItem>
                                                        )}
                                                        {order.status !== 'cancelled' && (
                                                            <DropdownMenuItem onClick={() => handleOrderAction(order.id, 'reject')}>
                                                                <XCircle className="h-4 w-4 mr-2" />
                                                                {UI_TEXT.REJECT_ORDER}
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDeleteOrder(order.id)} className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            {UI_TEXT.DELETE_ORDER}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


        </div>
    );
};

export default OrdersDashboard;
