import React, { useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
import "src/css/main/Shop.css";

// eslint-disable-next-line react/prop-types
const TagFilter = ({ tags }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (tagName) => {
        // Nếu "All Tags" được chọn, chọn tất cả
        if (tagName === "All Tags") {
            if (selectedTags.includes("All Tags")) {
                setSelectedTags([]); // Bỏ chọn tất cả
            } else {
                setSelectedTags(["All Tags", ...tags.map((tag) => tag.name)]);
            }
        } else {
            // Nếu chọn tag khác
            let updatedTags;
            if (selectedTags.includes(tagName)) {
                // Bỏ chọn tag
                updatedTags = selectedTags.filter((tag) => tag !== tagName);
            } else {
                // Thêm tag
                updatedTags = [...selectedTags.filter((tag) => tag !== "All Tags"), tagName];
            }

            // Nếu không còn tag nào được chọn, bỏ chọn "All Tags"
            setSelectedTags(updatedTags);
        }
    };

    return (
        <>
            <h5 className="pro-sidebar-title">Tag</h5>
            <ListGroup>
                {/* Mục All Tags */}
                <ListGroup.Item style={{ border: "none" }}>
                    <Form.Check
                        type="checkbox"
                        label="All Tags"
                        id="checkbox-all"
                        checked={selectedTags.includes("All Tags")}
                        onChange={() => handleTagChange("All Tags")}
                    />
                </ListGroup.Item>

                {/* Các tags */}
                {tags.map((tag, index) => (
                    <ListGroup.Item key={index} style={{ border: "none" }}>
                        <Form.Check
                            type="checkbox"
                            label={tag.name}
                            id={`checkbox-${index}`}
                            checked={selectedTags.includes(tag.name)}
                            onChange={() => handleTagChange(tag.name)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default TagFilter;
