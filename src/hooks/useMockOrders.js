export const useMockOrders = (userId) => {
  const mockOrders = [
    {
      id: "mock-order-1",
      orderInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "+1234567890",
        addressLine: "123 Main Street",
        district: "Downtown",
        city: "Sample City",
        country: "Sample Country",
        postcode: "12345"
      },
      items: [
        {
          id: "item-1",
          name: "Sample Product 1",
          quantity: 2,
          price: 29.99
        },
        {
          id: "item-2",
          name: "Sample Product 2",
          quantity: 1,
          price: 39.99
        }
      ],
      status: "delivered",
      totalAmount: 99.97,
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-order-2",
      orderInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "+1234567890",
        addressLine: "123 Main Street",
        district: "Downtown",
        city: "Sample City",
        country: "Sample Country",
        postcode: "12345"
      },
      items: [
        {
          id: "item-3",
          name: "Sample Product 3",
          quantity: 1,
          price: 49.99
        }
      ],
      status: "processing",
      totalAmount: 49.99,
      createdAt: new Date().toISOString()
    }
  ];

  const totalPurchaseValue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return {
    orders: mockOrders,
    isLoading: false,
    totalPurchaseValue,
    error: null
  };
};