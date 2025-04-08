import React, {useEffect} from "react";
import { ScrollArea, ScrollBar } from "src/components/ui/scroll-area";
import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";
import blogService from "src/services/blogService.js";

const CATEGORIES = [
    { id: "all", name: "All post" },
];

const BlogCategories = ({ selectedCategory, onCategoryChange, className }) => {
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const blogCategories = await blogService.getBlogCategories();

            const combinedCategories = [...CATEGORIES, ...blogCategories];
            setCategories(combinedCategories);
        };
        fetchCategories().then(r => r);
    }, []);



    return (
        <div className={cn("relative", className)}>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-2 p-1">
                    {categories.map(category => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => onCategoryChange(category.name)}
                            className="transition-colors"
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
        </div>
    );
};

export default BlogCategories; 