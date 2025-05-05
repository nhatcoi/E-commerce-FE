export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    DELIVERED: 'delivered',
    CANCELED: 'canceled'
};

export const ORDER_STATUS_VARIANTS = {
    [ORDER_STATUS.DELIVERED]: 'success',
    [ORDER_STATUS.PROCESSING]: 'warning',
    [ORDER_STATUS.CANCELED]: 'destructive',
    [ORDER_STATUS.PENDING]: 'secondary'
};

export const ITEMS_PER_PAGE = 10;

export const MOCK_ORDERS = [
    {
        id: "ORD-001",
        status: ORDER_STATUS.DELIVERED,
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
    }
];