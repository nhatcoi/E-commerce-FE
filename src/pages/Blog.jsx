import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Search, Filter, Mail } from "lucide-react";

// Components
import BlogGrid from "src/features/blog/BlogGrid";
import BlogSidebar from "src/features/blog/BlogSidebar";
import NewsletterSubscribe from "src/features/blog/NewsletterSubscribe";
import BlogCategories from "src/features/blog/BlogCategories";

const Blog = () => {
    const [view, setView] = useState("grid"); // grid or list view
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();

    return (
        <div className="flex-1 bg-gradient-to-br from-background to-muted/30 py-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the latest trends, insights, and updates from our team of experts.
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="md:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                </div>

                {/* Categories */}
                <BlogCategories
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    className="mb-8"
                />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Blog Posts Grid */}
                    <div className="lg:col-span-8">
                        <BlogGrid view={view} searchQuery={searchQuery} category={selectedCategory} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <BlogSidebar />
                    </div>
                </div>

                {/* Newsletter Section */}
                <NewsletterSubscribe className="mt-16" />
            </div>
        </div>
    );
};

export default Blog;
