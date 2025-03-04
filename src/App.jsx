import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import RouteIndex from "./router/RouteIndex.jsx";

const App = () => (
    <Provider store={store}>
        <RouteIndex />
    </Provider>
);

export default App;
