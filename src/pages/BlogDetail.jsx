import React, {useState} from "react";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {Avatar, AvatarFallback, AvatarImage} from "src/components/ui/avatar";
import {Button} from "src/components/ui/button";
import {Card} from "src/components/ui/card";
import {Badge} from "src/components/ui/badge";
import {Separator} from "src/components/ui/separator";
import {Input} from "src/components/ui/input";
import {Textarea} from "src/components/ui/textarea";
import {
    Facebook,
    Twitter,
    Linkedin,
    Link as LinkIcon,
    Clock,
    Calendar,
    ChevronLeft,
    Send
} from "lucide-react";
import {blogDetailData} from "src/data/blog/detail";
import "src/styles/BlogDetail.css";

const BlogDetail = () => {
    const {slug} = useParams();
    const [comment, setComment] = useState("");
    const post = blogDetailData.mockPost;

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.div
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    className="mb-8"
                >
                    <Button variant="ghost" className="group" onClick={() => window.history.back()}>
                        <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform"/>
                        Back to Blog
                    </Button>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Main Content */}
                    <motion.div variants={itemVariants} className="lg:col-span-8">
                        {/* Article Header */}
                        <div className="mb-8">
                            <Badge variant="secondary" className="mb-4">
                                {post.category}
                            </Badge>
                            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                            {/* Author and Meta Info */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name}/>
                                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">{post.author.name}</div>
                                    <div className="text-sm text-muted-foreground">{post.author.role}</div>
                                </div>
                                <Separator orientation="vertical" className="h-8"/>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2"/>
                                    {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-2"/>
                                    {post.readTime}
                                </div>
                            </div>

                            {/* Featured Image */}
                            <motion.img
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.5}}
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-[400px] object-cover rounded-lg mb-8"
                            />
                        </div>

                        {/* Article Content */}
                        <div
                            className="prose prose-lg max-w-none mb-12"
                            dangerouslySetInnerHTML={{__html: post.content}}
                        />

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Share Buttons */}
                        <div className="flex items-center space-x-4 mb-12">
                            <span className="text-sm font-medium">Share:</span>
                            <Button size="icon" variant="outline">
                                <Facebook className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="outline">
                                <Twitter className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="outline">
                                <Linkedin className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="outline">
                                <LinkIcon className="h-4 w-4"/>
                            </Button>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-card rounded-lg p-6">
                            <h3 className="text-2xl font-bold mb-2">{blogDetailData.comments.title}</h3>
                            <p className="text-muted-foreground mb-6">{blogDetailData.comments.subtitle}</p>

                            <div className="space-y-4">
                                <Textarea
                                    placeholder={blogDetailData.comments.placeholder}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="min-h-[100px]"
                                />
                                <Button className="w-full sm:w-auto">
                                    <Send className="h-4 w-4 mr-2"/>
                                    {blogDetailData.comments.buttonText}
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-4">
                        {/* Newsletter */}
                        <Card className="p-6 mb-8">
                            <h3 className="text-xl font-bold mb-2">{blogDetailData.newsletter.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {blogDetailData.newsletter.subtitle}
                            </p>
                            <div className="space-y-2">
                                <Input placeholder={blogDetailData.newsletter.placeholder}/>
                                <Button className="w-full">
                                    {blogDetailData.newsletter.buttonText}
                                </Button>
                            </div>
                        </Card>

                        {/* Related Posts */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
                            <div className="space-y-4">
                                {post.relatedPosts.map((relatedPost) => (
                                    <Card key={relatedPost.id} className="overflow-hidden group">
                                        <div className="relative aspect-[16/9]">
                                            <img
                                                src={relatedPost.thumbnail}
                                                alt={relatedPost.title}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold group-hover:text-primary transition-colors">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {format(new Date(relatedPost.publishDate), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetail;