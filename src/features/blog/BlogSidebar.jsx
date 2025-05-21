import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import { Eye, Flame, Hash } from "lucide-react";
import { generateSlug } from "src/utils/utils.js";
import { useGetBlogsQuery, useGetBlogCategoriesQuery } from "src/store/blogApi";

const TAGS = [
    "React", "JavaScript", "Web Development", "UI/UX", "Design",
    "TypeScript", "Node.js", "CSS", "HTML", "Frontend",
];

const BlogSidebar = () => {
    const popularPostsParams = {
        page: 0,
        size: 4,
        views: "desc",
    };

    const { data: blogsData } = useGetBlogsQuery(popularPostsParams);
    const { data: categoriesData } = useGetBlogCategoriesQuery();

    const popularPosts = blogsData?.data || [];
    const countBlogs = categoriesData?.data || [];

    return (
        <div className="space-y-8">
            {/* Popular Posts */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-primary" />
                        Popular Posts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {popularPosts.map(post => (
                            <Link 
                                key={post.id} 
                                to={`/blog/${generateSlug(post.title)}`}
                                className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                            >
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-20 h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                />
                                <div>
                                    <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                        <Eye className="h-4 w-4" />
                                        {post.views} views
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Categories */}
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {countBlogs.map(category => (
                            <div
                                key={category.name}
                                className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded cursor-pointer transition-colors"
                            >
                                <span className="font-medium">{category.name}</span>
                                <Badge variant="black">{category.count}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tags */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        Popular Tags
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {TAGS.map(tag => (
                            <Badge
                                key={tag}
                                variant="black"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogSidebar;