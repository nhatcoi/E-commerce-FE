import React from "react";
import { Card, CardContent } from "src/components/ui/card.jsx";
import Categories from "./SideBar/Categories.jsx";
import ColorFilter from "src/components/shop/SideBar/ColorFilter.jsx";
import SizeFilter from "src/components/shop/SideBar/SizeFilter.jsx";
import TagFilter from "src/components/shop/SideBar/TagFilter.jsx";
import Search from "src/components/shop/SideBar/Search.jsx";

const Sidebar = ({ categories }) => {
    return (
        <>
            <CardContent className="space-y-4">
                <h5 className="text-lg font-semibold">Filter Products</h5>
                <div className="flex flex-col space-y-2">
                    <Search onSearch={(searchTerm) => console.log(searchTerm)} />
                    <Categories categories={categories} />
                    <ColorFilter colors={[{ name: "Red" }, { name: "Blue" }, { name: "Green" }]} />
                    <SizeFilter sizes={[{ name: "64" }, { name: "256" }, { name: "512" }, { name: "1T" }]} />
                    <TagFilter tags={[{ name: "Old" }, { name: "New" }, { name: "Sale" }]} />
                </div>

            </CardContent>
        </>
    );
};

export default Sidebar;
