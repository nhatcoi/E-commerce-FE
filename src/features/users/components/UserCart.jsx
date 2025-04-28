import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "src/utils/formatCurrency";

// Sample cart data for development and testing
const SAMPLE_CART_ITEMS = [
    {
        id: 1,
        productName: "Wireless Headphones Pro",
        price: 199.99,
        quantity: 1,
        image: "https://example.com/headphones.jpg",
        status: "in_stock",
        stockQuantity: 10
    },
    {
        id: 2,
        productName: "Smart Watch Series 5",
        price: 299.99,
        quantity: 2,
        image: "https://example.com/watch.jpg",
        status: "in_stock",
        stockQuantity: 5
    },
    {
        id: 3,
        productName: "Laptop Stand",
        price: 49.99,
        quantity: 1,
        image: "https://example.com/stand.jpg",
        status: "low_stock",
        stockQuantity: 2
    }
];

const STATUS_VARIANTS = {
    in_stock: 'success',
    low_stock: 'warning',
    out_of_stock: 'destructive'
};

export const UserCart = ({ userId }) => {
    // In a real implementation, you would fetch cart from an API
    const cartItems = SAMPLE_CART_ITEMS;

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getStockStatus = (item) => {
        if (item.stockQuantity === 0) return 'out_of_stock';
        if (item.stockQuantity <= 3) return 'low_stock';
        return 'in_stock';
    };

    const getStatusText = (status) => {
        const statusMap = {
            in_stock: 'In Stock',
            low_stock: 'Low Stock',
            out_of_stock: 'Out of Stock'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Shopping Cart</CardTitle>
                            <CardDescription>Current items in user's cart</CardDescription>
                        </div>
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            No items in cart
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="font-medium">{item.productName}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{formatCurrency(item.price)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-12 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        disabled={item.quantity >= item.stockQuantity}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={STATUS_VARIANTS[getStockStatus(item)]}>
                                                    {getStatusText(getStockStatus(item))}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {formatCurrency(item.price * item.quantity)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex flex-col gap-2 items-end pt-4">
                                <div className="flex justify-between w-full max-w-xs">
                                    <span className="font-medium">Subtotal:</span>
                                    <span>{formatCurrency(calculateTotal())}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Clear Cart
                                    </Button>
                                    <Button size="sm">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};