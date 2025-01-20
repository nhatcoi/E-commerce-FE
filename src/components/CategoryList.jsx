// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Autoplay, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'src/css/swiper-custom.css';

// eslint-disable-next-line react/prop-types
const CategoryList = ({ categories }) => {
    return (
        <>
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <Swiper
                            className="mySwiper"
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Navigation, Autoplay, Pagination]} // Thêm Autoplay vào modules
                            loop={true}
                            spaceBetween={20}
                            navigation={true}
                            speed={800} // Tăng tốc độ chuyển đổi slide (ms)
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}

                            breakpoints={{
                                0: {slidesPerView: 1}, //
                                600: {slidesPerView: 2},
                                1000: {slidesPerView: 4},
                            }}
                        >
                            {categories.map(category => {
                                const href = `/shop-grid?category=${encodeURIComponent(category.id)}`;
                                return (
                                    <SwiperSlide key={category.id}>
                                        <div
                                            className="categories__item set-bg"
                                            key={category.id}
                                            style={{backgroundImage: `url('${category.imageUrl}')`}}
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

        </>
    );
};

export default CategoryList;
