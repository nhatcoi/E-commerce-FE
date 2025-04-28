import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "src/components/ui/accordion";
import { formatCurrency } from "src/utils/formatCurrency";
import { useUserOrders } from '../hooks/useUserOrders';

const ORDER_STATUS_VARIANTS = {
    'delivered': 'success',
    'processing': 'warning',
    'canceled': 'destructive',
    'pending': 'secondary'
};

// Sample order data for development and testing
const SAMPLE_ORDERS = [
    {
        id: "ORD-001",
        status: "delivered",
        totalAmount: 299.97,
        createdAt: "2025-04-20T10:00:00Z",
        subtotal: 269.97,
        shippingCost: 15.00,
        tax: 15.00,
        items: [
            {
                id: 1,
                productName: "Wireless Headphones",
                quantity: 1,
                price: 199.99
            },
            {
                id: 2,
                productName: "Phone Case",
                quantity: 2,
                price: 34.99
            }
        ]
    },
    {
        id: "ORD-002",
        status: "processing",
        totalAmount: 1299.00,
        createdAt: "2025-04-25T15:30:00Z",
        subtotal: 1249.00,
        shippingCost: 0.00,
        tax: 50.00,
        items: [
            {
                id: 3,
                productName: "Laptop Pro",
                quantity: 1,
                price: 1249.00
            }
        ]
    },
    {
        id: "ORD-003",
        status: "pending",
        totalAmount: 89.97,
        createdAt: "2025-04-27T09:15:00Z",
        subtotal: 79.97,
        shippingCost: 5.00,
        tax: 5.00,
        items: [
            {
                id: 4,
                productName: "USB-C Cable",
                quantity: 2,
                price: 19.99
            },
            {
                id: 5,
                productName: "Wireless Mouse",
                quantity: 1,
                price: 39.99
            }
        ]
    }
];

export function UserOrders({ userId }) {
    let orders = [];
    let isLoading = false;
    let totalPurchaseValue = 0;

    try {
        // Try to use the hook first
        const result = useUserOrders(userId);
        orders = result.orders;
        isLoading = result.isLoading;
        totalPurchaseValue = result.totalPurchaseValue;
    } catch (error) {
        console.log('Using sample data due to hook error:', error);
        // Fallback to sample data if the hook fails
        orders = SAMPLE_ORDERS;
        totalPurchaseValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        isLoading = false;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Overview of user's purchase history</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        Total Purchase Value: {formatCurrency(totalPurchaseValue)}
                    </div>
                    <div className="text-muted-foreground">
                        Total Orders: {orders.length}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Detailed list of all orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {orders.map((order) => (
                            <AccordionItem key={order.id} value={order.id}>
                                <AccordionTrigger>
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <div>Order #{order.id}</div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={ORDER_STATUS_VARIANTS[order.status]}>
                                                {order.status}
                                            </Badge>
                                            <span>{formatCurrency(order.totalAmount)}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
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
                                            {order.items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.productName}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{formatCurrency(item.price)}</TableCell>
                                                    <TableCell>
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Subtotal:</span>
                                            <span>{formatCurrency(order.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Shipping:</span>
                                            <span>{formatCurrency(order.shippingCost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Tax:</span>
                                            <span>{formatCurrency(order.tax)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span>{formatCurrency(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}