import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
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
        <Form onSubmit={handleSearch} className="search-bar">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
};

export default Search;
