import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { CircularProgress, Typography } from "@mui/material";

const CategorySection = () => {

    const { items: categoriesResponse, loading, error } = useSelector((state) => state.categories);


    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;

    return (
        <section className="categories">
            <div className="container">
                <div className="row">
                    <Swiper
                        className="mySwiper"
                        pagination={{ dynamicBullets: true }}
                        modules={[Navigation, Autoplay, Pagination]}
                        loop={true}
                        spaceBetween={20}
                        navigation={true}
                        speed={800}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            600: { slidesPerView: 2 },
                            1000: { slidesPerView: 4 },
                        }}
                    >
                        {categoriesResponse.map(category => {
                            const href = `/shop?category=${encodeURIComponent(category.id)}`;
                            return (
                                <SwiperSlide key={category.id}>
                                    <div
                                        className="categories__item set-bg"
                                        style={{ backgroundImage: `url('${category.imageUrl}')` }}
                                    >
                                        <h5>
                                            <a href={href}>{category.name}</a>
                                        </h5>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
