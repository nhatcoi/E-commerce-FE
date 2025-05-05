import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "src/components/ui/table";
import { Badge } from "src/components/ui/badge";
import { formatCurrency } from "src/utils/formatCurrency";

const ORDER_STATUS_VARIANTS = {
    'delivered': 'success',
    'processing': 'warning',
    'canceled': 'destructive',
    'pending': 'secondary'
};

export const OrderList = ({ orders }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <Badge variant={ORDER_STATUS_VARIANTS[order.status]}>
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['delivered', 'processing', 'canceled', 'pending']).isRequired,
        totalAmount: PropTypes.number.isRequired
    })).isRequired
};