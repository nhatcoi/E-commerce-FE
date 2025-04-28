import {useEffect, useRef} from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'src/components/ui/carousel.jsx';
import ProductCard from './ProductCard.jsx';
import {useGetProductsQuery} from "src/features/product/services/productApi.js";
import {useSelector} from "react-redux";

export default function CarouselProduct(params) {
    const { data: productData } = useGetProductsQuery({
        page: 0,
        size: 8,
        ...params,
    });
    const products = (productData?.data ?? []).filter(
        (product) => product.id !== params.productId
    );
    const { averageRatings: ratings } = useSelector((state) => state.ratings);

    const nextBtnRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            if(nextBtnRef.current){
                nextBtnRef.current.click();
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="mt-12 px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Related Products
            </h2>

            <div className="relative">
                <Carousel
                    className="w-full max-w-screen-2xl mx-auto"
                    opts={{
                        align: 'start',
                        slidesToScroll: 1,
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 pr-4 scroll-smooth">
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                            >
                                <ProductCard product={product}
                                    rating={ratings[product.id] || 0}
                                    className="w-full h-full"
                                    onClick={() => {
                                        window.location.href = `/product/${product.id}`;
                                    }}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious
                        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                        variant="outline"
                        size="icon"
                    />

                    <CarouselNext
                        ref={nextBtnRef}
                        className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                        variant="outline"
                        size="icon"
                    />
                </Carousel>
            </div>
        </section>
    );
}