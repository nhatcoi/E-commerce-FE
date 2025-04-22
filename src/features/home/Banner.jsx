import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { bannerData } from 'src/data/home/banner';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'src/styles/component/Banner.css';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { slides, settings } = bannerData;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`banner-container ${isVisible ? 'fade-in' : ''}`}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={settings.autoplay}
                pagination={settings.pagination}
                navigation={settings.navigation}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="banner-slide">
                            <img src={slide.imageUrl} alt={slide.title} className="banner-image" />
                            <Container className="d-flex justify-content-center align-items-center h-100">
                                <Row className="text-center text-white w-100">
                                    <Col>
                                        <div className="banner-text">
                                            <h1>{slide.title}</h1>
                                            <p>{slide.description}</p>
                                            <Button
                                                variant={slide.button.variant}
                                                className="banner-button"
                                                href={slide.button.url}
                                            >
                                                {slide.button.text}
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