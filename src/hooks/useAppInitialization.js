import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "src/services/authService.js";
import { setLoading } from "src/store/auth2slice.js"; // auth2 slice

export const useAppInitialization = () => {
    const dispatch = useDispatch();
    const { loading, accessToken } = useSelector((state) => state.auth2);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                dispatch(setLoading(true));
                await authService.restoreSession(dispatch);
            } catch (error) {
                console.error("Session restore error:", error);
            } finally {
                setIsInitialized(true);
                dispatch(setLoading(false));
            }
        };

        initializeApp();
    }, [dispatch, accessToken]);

    return { isInitialized, loading };
};
