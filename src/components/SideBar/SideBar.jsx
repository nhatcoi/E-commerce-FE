import React from "react";
import { Card } from "react-bootstrap";
import Categories from "./Categories";
import ColorFilter from "src/components/SideBar/ColorFilter.jsx";
import SizeFilter from "src/components/SideBar/SizeFilter.jsx";
import TagFilter from "src/components/SideBar/TagFilter.jsx";
import Search from "src/components/SideBar/Search.jsx";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ categories }) => {
    return (
        <Card className="p-3">
            <h5>Filter Products</h5>
            <Search onSearch={(searchTerm) => console.log(searchTerm)} />
            <Categories categories={categories} />
            <ColorFilter colors={[{ name: "Red" }, { name: "Blue" }, { name: "Green" }]} />
            <SizeFilter sizes={[{ name: "64" }, { name: "256" }, { name: "512" }, { name: "1T" }]} />
            <TagFilter tags={[{ name: "Old" }, { name: "New" }, { name: "Sale" }]} />
        </Card>
    );
};

export default Sidebar;
