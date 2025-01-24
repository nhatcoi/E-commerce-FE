import React from "react";
import Categories from "./Categories";
import { Card } from "react-bootstrap";

const Sidebar = ({ categories }) => {
    return (
        <Card className="p-3">
            <h5>Filter Products</h5>
            <Categories categories={categories} />
        </Card>
    );
};

export default Sidebar;
