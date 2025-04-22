import React, { useState } from "react";
import { Badge } from "src/components/ui/Badge.jsx";

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
                <Badge
                    onClick={() => handleTagClick("All Tags")}
                    className={`cursor-pointer bg-white text-black border border-gray-300 ${
                        selectedTags.includes("") ? "ring-2 ring-black" : ""
                    }`}
                >
                    All Tags
                </Badge>
                {tags.map((tag, index) => (
                    <Badge
                        key={index}
                        onClick={() => handleTagClick(tag.name)}
                        className={`cursor-pointer bg-white text-black border border-gray-300 ${
                            selectedTags.includes(tag.name) ? "ring-2 ring-black" : ""
                        }`}
                    >
                        {tag.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default TagFilter;
