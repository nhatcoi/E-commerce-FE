import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const BlogList = ({ blogs }) => {


    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">OUR BLOG</h2>
            <Row>
                {blogs.map((blog, index) => (
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

export default BlogList;
