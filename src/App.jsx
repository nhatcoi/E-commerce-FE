import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouteIndex from "./router/RouteIndex.jsx";
import { authService } from "src/services/authService.js";
import { setLoading } from "src/store/slices/authSlice.js";

const App = () => {
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    const { loading, accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Start session restoration
                dispatch(setLoading(true));
                
                // Check if we already have a token in Redux store
                if (accessToken) {
                    // We have a token from Redux persist, try to fetch user info
                    try {
                        await authService.restoreSession(dispatch);
                    } catch (error) {
                        console.error("Failed to restore session:", error);
                    }
                } else {
                    // No token, try to refresh
                    try {
                        await authService.restoreSession(dispatch);
                    } catch (error) {
                        console.log("No valid session found");
                    }
                }
            } catch (error) {
                console.error("Failed to initialize app:", error);
            } finally {
                setIsInitialized(true);
                dispatch(setLoading(false));
            }
        };

        initializeApp();
    }, [dispatch, accessToken]);

    // Show loading state while initializing
    if (!isInitialized || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <RouteIndex />
        </React.Fragment>
    );
};

export default App;
