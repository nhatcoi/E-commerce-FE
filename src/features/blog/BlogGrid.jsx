import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { format, parseISO } from 'date-fns';
import { Badge } from "src/components/ui/badge";
import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import blogService from "src/services/blogService.js";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "src/components/ui/pagination.jsx";


const BlogGrid = ({ view, searchQuery, category }) => {
    const [blogs, setBlogs] = useState([]);
    const postsPerPage = 4;
    const [pagination, setPagination] = useState();

    useEffect(() => {
        const params = {
            page: 0,
            size: postsPerPage,
            keyword: searchQuery || undefined,
            category: category === "All post" ? undefined : category,
        }
        fetchBlogs(params).then(r => r);
    }, [searchQuery, category]);  // Re-fetch when page, searchQuery or category changes

    const fetchBlogs = async (params) => {


        const blogResponse = await blogService.getBlogs(params);
        setBlogs(blogResponse.data);
        setPagination(blogResponse.pagination)
    };

    const handlePageChange = (newPage) => {
        if (!pagination || newPage < 0 || newPage >= pagination.totalPages) return;
        fetchBlogs({page: newPage, size: pagination.pageSize}).then(r => r);
    };


    return (
        <div className="space-y-8">
            {/* Grid View */}
            <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {blogs.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                                />
                                <Badge className="absolute top-4 left-4">{post.category}</Badge>
                            </div>
                            <CardHeader>
                                <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary cursor-pointer">
                                    {post.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {format(parseISO(post.date), "MMM d, yyyy")}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {post.views || 0}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        {post.comments || 0}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto border-t pt-4">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={post.author.avatar} />
                                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{post.author.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Phân trang */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 0}
                                />
                            </PaginationItem>

                            {[...Array(pagination.totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={index === pagination.currentPage}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage >= pagination.totalPages - 1}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default BlogGrid;