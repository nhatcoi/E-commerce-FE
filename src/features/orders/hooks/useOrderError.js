import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'src/store/orderSlice';
import { toast } from "src/components/ui/use-toast";

export const useOrderError = (error) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            // Show error toast
            toast({
                title: "Order Error",
                description: error,
                variant: "destructive"
            });

            // Clear error after showing
            dispatch(setError(null));
        }
    }, [error, dispatch]);
};