import React from "react";
import Categories from "./Categories";
// import ColorFilter from "./ColorFilter";
// import SizeFilter from "./SizeFilter";
import { Card } from "react-bootstrap";

const Sidebar = () => {
    return (
        <Card className="p-3">
            <h5>Filter Products</h5>
            <Categories />
            {/*<ColorFilter />*/}
            {/*<SizeFilter />*/}
        </Card>
    );
};

export default Sidebar;
