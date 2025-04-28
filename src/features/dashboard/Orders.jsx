import React from "react";
import {
  useGetOrdersQuery,
  useCancelOrderMutation,
} from "src/store/orderApi.js";
import { Button } from "src/components/ui/button.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select.jsx";
import { Badge } from "src/components/ui/badge.jsx";
import { toast } from "src/components/ui/use-toast.js";
import { formatCurrency } from "src/utils/formatCurrency.js";

const statusColors = {
  PENDING: "bg-yellow-500",
  PROCESSING: "bg-blue-500",
  SHIPPED: "bg-purple-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

const OrderDetails = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Customer Information</h4>
          <p>Name: {order.orderInfo.fullName}</p>
          <p>Email: {order.orderInfo.email}</p>
          <p>Phone: {order.orderInfo.phoneNumber}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <p>{order.orderInfo.addressLine}</p>
          <p>{order.orderInfo.district}, {order.orderInfo.city}</p>
          <p>{order.orderInfo.country}, {order.orderInfo.postcode}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Order Items</h4>
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
            {order.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <div>
          <p>Payment Method: {order.paymentMethod}</p>
          {order.discountCode && (
            <p>Discount Code: {order.discountCode}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">
            Total: {formatCurrency(order.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Orders() {
  const { data, isLoading } = useGetOrdersQuery({});
  const [cancelOrder] = useCancelOrderMutation();
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id).unwrap();
      toast({
        title: "Success",
        description: "Order cancelled successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">
          Manage customer orders here.
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.orderInfo.fullName}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Order Details #{order.id}</DialogTitle>
                        </DialogHeader>
                        <OrderDetails order={order} />
                      </DialogContent>
                    </Dialog>
                    {order.status === 'PENDING' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}