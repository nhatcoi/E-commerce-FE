import React, { useState } from "react";
import { Tag } from "src/components/ui/tag.jsx";

const TagFilter = ({ tags, onTagChange }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tagName) => {
        let updatedTags;

        if (tagName === "All Tags") {
            updatedTags = selectedTags.includes("")
                ? []
                : [""];
        } else {
            updatedTags = selectedTags.includes("")
                ? [tagName]
                : selectedTags.includes(tagName)
                    ? selectedTags.filter((tag) => tag !== tagName)
                    : [...selectedTags, tagName];
        }

        setSelectedTags(updatedTags);
        if (onTagChange) {
            onTagChange(updatedTags);
        }
    };

    return (
        <div className="space-y-4">
            <h5 className="pro-sidebar-title">Tags</h5>
            <div className="flex flex-wrap gap-2">
                <Tag
                    selected={selectedTags.includes("")}
                    onClick={() => handleTagClick("All Tags")}
                    className="cursor-pointer"
                >
                    All Tags
                </Tag>
                {tags.map((tag, index) => (
                    <Tag
                        key={index}
                        selected={selectedTags.includes(tag.name)}
                        onClick={() => handleTagClick(tag.name)}
                        className="cursor-pointer"
                    >
                        {tag.name}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default TagFilter;
