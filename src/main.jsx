import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.js";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                        <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
