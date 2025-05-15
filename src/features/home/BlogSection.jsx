import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "src/components/ui/card";
import ServerError from 'src/components/error/ServerError';
import { blogSectionData } from 'src/data/home/blog';
import {generateSlug} from "src/utils/utils.js";
import { useGetRecentNewsQuery } from 'src/store/blogApi';

const BlogSection = () => {
    const { data: posts = [], isLoading: loading, error } = useGetRecentNewsQuery();
    const recentNews = posts?.data || [];

    console.log("posts", posts);

    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <ServerError message={error} />;

    // Function to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Function to truncate text
    const truncateText = (text, maxLength = blogSectionData.textTruncate.excerptLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength).trim() + '...';
    };

    return (
        <section className={blogSectionData.sectionStyle.padding}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="w-32 h-[1px] bg-black"></div>
                        <h2 className="text-3xl font-bold uppercase tracking-wider">{blogSectionData.title}</h2>
                        <div className="w-32 h-[1px] bg-black"></div>
                    </div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {blogSectionData.subtitle}
                    </p>
                </div>

                {/* Blog Grid */}
                <div className={`grid grid-cols-${blogSectionData.display.gridCols.base} md:grid-cols-${blogSectionData.display.gridCols.md} lg:grid-cols-${blogSectionData.display.gridCols.lg} gap-6`}>
                    {recentNews.slice(0, blogSectionData.display.postsToShow).map((post) => (
                        <Card key={post.id} className="group overflow-hidden border border-gray-200 hover:border-black/50 transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <CardHeader className="space-y-2">
                                {/* Meta info */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>

                                {/* Title */}
                                <Link to={`/blog/${generateSlug(post.title)}`}>
                                    <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">
                                    {truncateText(post.content)}
                                </p>
                            </CardContent>

                            <CardFooter className="pt-4">
                                {/* Read More Button */}
                                <Button variant="ghost" size="sm" className="group/btn ml-auto" asChild>
                                    <Link to={`/blog/${post.id}`}>
                                        {blogSectionData.readMoreText}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button asChild>
                        <Link to="/blog" className="flex items-center gap-2">
                            {blogSectionData.viewAllText}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
