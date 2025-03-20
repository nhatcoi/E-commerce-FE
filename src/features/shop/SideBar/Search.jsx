import React, { useState } from "react";
import { Button } from "src/components/ui/button.jsx";
import { Input } from "src/components/ui/input.jsx";
import "src/css/main/Shop.css";

// eslint-disable-next-line react/prop-types
const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <div className="flex w-full items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit">
                    Search
                </Button>
            </div>
        </form>
    );
};

export default Search;
