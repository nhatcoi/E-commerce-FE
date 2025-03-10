import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {useSelector} from "react-redux";
import {CircularProgress, Typography} from "@mui/material";
import React from "react";

const BlogSection = () => {

    const { items: recentNewsResponse, loading, error } = useSelector((state) => state.blogs);


    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">OUR BLOG</h2>
            <Row>
                {recentNewsResponse.map((blog, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img variant="top" src={blog.thumbnail} alt={blog.title} />
                            <Card.Body className="text-center">
                                {/*<div className="mb-3">*/}
                                {/*    {blog.categories.map((category, idx) => (*/}
                                {/*        <Badge*/}
                                {/*            key={idx}*/}
                                {/*            bg="primary"*/}
                                {/*            className="text-uppercase mx-1"*/}
                                {/*        >*/}
                                {/*            {category}*/}
                                {/*        </Badge>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text className="text-muted">By {blog.author}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogSection;
