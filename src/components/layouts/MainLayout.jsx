// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from 'src/components/layouts/MainLayout/Header.jsx';
import Footer from 'src/components/layouts/MainLayout/Footer.jsx';
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
