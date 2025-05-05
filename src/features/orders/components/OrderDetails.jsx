import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";
import { formatCurrency } from "src/utils/formatCurrency";

export const OrderDetails = ({ order }) => {
    return (
        <div className="space-y-6">
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
            
            <div className="space-y-2">
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
        </div>
    );
};