import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Autoplay, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'src/css/main/Banner.css';

const Banner = ({ images }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`banner-container ${isVisible ? 'fade-in' : ''}`}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="banner-slide">
                            <img src={image} alt={`Slide ${index}`} className="banner-image" />
                            <Container className="d-flex justify-content-center align-items-center h-100">
                                <Row className="text-center text-white w-100">
                                    <Col>
                                        <div className="banner-text">
                                            <h1>Welcome to Our Website</h1>
                                            <p>Your journey to amazing experiences starts here.</p>
                                            <Button variant="danger" className="banner-button">
                                                Get Started
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    );
};

export default Banner;