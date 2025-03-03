// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store"; // Đổi thành default export

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Layout from "./pages/Layout";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;
