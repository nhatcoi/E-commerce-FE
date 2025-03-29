import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CategorySection = () => {
    const { items: categoriesResponse, loading, error } = useSelector((state) => state.categories);
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    );

    if (loading) return <div className="flex justify-center py-6"><CircularProgress /></div>;
    if (error) return <Typography variant="body1" className="text-red-500">Lỗi: {error}</Typography>;

    return (
        <section className="py-12 my-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="w-32 h-[1px] bg-black"></div>
                        <h2 className="text-3xl font-bold uppercase tracking-wider">Categories</h2>
                        <div className="w-32 h-[1px] bg-black"></div>
                    </div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Explore our wide range of categories and find exactly what you're looking for
                    </p>
                </div>

                {/* Categories Carousel */}
                <div className="relative">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {categoriesResponse.map(category => (
                                <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                                    <Link 
                                        to={`/shop?category=${encodeURIComponent(category.id)}`}
                                        className="block group relative overflow-hidden rounded-xl aspect-[4/5] bg-black/5"
                                    >
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url('${category.imageUrl}')` }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <h3 className="text-xl md:text-2xl font-semibold text-white px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm transition-all group-hover:bg-black/50">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12" />
                        <CarouselNext className="hidden md:flex -right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
