import PropTypes from 'prop-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { OrderList } from './OrderList';
import { OrderSkeleton } from './OrderSkeleton';
import { useOrders } from '../hooks/useOrders';
import { useOrderError } from '../hooks/useOrderError';
import { formatCurrency } from "src/utils/formatCurrency";
import {useGetOrdersQuery} from "src/store/orderApi.js";

export const Orders = ({ userId }) => {
    const {
        data = {},
        isLoading,
        error
    } = useGetOrdersQuery({ userId });

    const orders = data.data || [];

    const totalPurchaseValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Handle order errors
    useOrderError(error);

    if (isLoading) {
        return <OrderSkeleton />;
    }

    if (!orders.length) {
        return (
            <Card>
                <CardContent className="text-center py-6">
                    <p className="text-muted-foreground">No orders found.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Overview of your purchase history</CardDescription>
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
                    <OrderList orders={orders} />
                </CardContent>
            </Card>
        </div>
    );
};

Orders.propTypes = {
    userId: PropTypes.string.isRequired
};