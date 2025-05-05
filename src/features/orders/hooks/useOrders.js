import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderService } from 'src/services/orderService';
import { setCurrentOrder, setError, setLoading } from 'src/store/orderSlice';
import { MOCK_ORDERS } from '../constants/orderConstants';

export const useOrders = (userId) => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentOrder, error } = useSelector(state => state.order);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                dispatch(setLoading(true));
                // In production, use the real API call
                // const response = await orderService.getOrders();
                // setOrders(response.data);
                
                // Using mock data for development
                setOrders(MOCK_ORDERS);
                dispatch(setError(null));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                setIsLoading(false);
                dispatch(setLoading(false));
            }
        };

        fetchOrders();
    }, [dispatch, userId]);

    const totalPurchaseValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const createOrder = async (orderData) => {
        try {
            dispatch(setLoading(true));
            const response = await orderService.createOrder(orderData);
            dispatch(setCurrentOrder(response));
            return response;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            dispatch(setLoading(true));
            await orderService.cancelOrder(orderId);
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: 'canceled' }
                        : order
                )
            );
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        orders,
        currentOrder,
        isLoading,
        error,
        totalPurchaseValue,
        createOrder,
        cancelOrder
    };
};