import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { Heart, ShoppingCart, Trash2, AlertTriangle } from "lucide-react";
import { formatCurrency } from "src/utils/formatCurrency";

// Sample wishlist data for development and testing
const SAMPLE_WISHLIST_ITEMS = [
    {
        id: 1,
        productName: "MacBook Pro M3",
        price: 1999.99,
        addedDate: "2025-04-27T15:30:00Z",
        stockStatus: "in_stock",
        image: "https://example.com/macbook.jpg"
    },
    {
        id: 2,
        productName: "AirPods Pro 2",
        price: 249.99,
        addedDate: "2025-04-26T10:15:00Z",
        stockStatus: "low_stock",
        image: "https://example.com/airpods.jpg"
    },
    {
        id: 3,
        productName: "iPad Air",
        price: 599.99,
        addedDate: "2025-04-25T09:45:00Z",
        stockStatus: "out_of_stock",
        image: "https://example.com/ipad.jpg"
    }
];

const STOCK_STATUS_VARIANTS = {
    in_stock: 'success',
    low_stock: 'warning',
    out_of_stock: 'destructive'
};

const STOCK_STATUS_TEXT = {
    in_stock: 'In Stock',
    low_stock: 'Low Stock',
    out_of_stock: 'Out of Stock'
};

export const UserWishlist = ({ userId }) => {
    // In a real implementation, you would fetch wishlist from an API
    const wishlistItems = SAMPLE_WISHLIST_ITEMS;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Wishlist</CardTitle>
                            <CardDescription>Saved items for future purchase</CardDescription>
                        </div>
                        <Heart className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            No items in wishlist
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Added Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {wishlistItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="font-medium">{item.productName}</div>
                                            </TableCell>
                                            <TableCell>{formatCurrency(item.price)}</TableCell>
                                            <TableCell>{formatDate(item.addedDate)}</TableCell>
                                            <TableCell>
                                                <Badge variant={STOCK_STATUS_VARIANTS[item.stockStatus]}>
                                                    {STOCK_STATUS_TEXT[item.stockStatus]}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        disabled={item.stockStatus === 'out_of_stock'}
                                                    >
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        Add to Cart
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex justify-between items-center pt-4">
                                <div className="text-sm text-muted-foreground">
                                    {wishlistItems.length} items in wishlist
                                </div>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear Wishlist
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};