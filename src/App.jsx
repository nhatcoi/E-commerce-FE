import React from "react";
import RouteIndex from "./router/RouteIndex.jsx";
import { Toaster } from "src/components/ui/toaster";
import LoadingScreen from "src/components/common/LoadingScreen.jsx";
import { useAppInitialization } from "src/hooks/useAppInitialization.js";

const App = () => {
    const { isInitialized, loading } = useAppInitialization();

    if (!isInitialized || loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <RouteIndex />
            <Toaster />
        </>
    );
};

export default App;
