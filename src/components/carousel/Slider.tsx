'use client'

import 'swiper/css';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, ProductTypeCard } from '../products/Card';
import styles from './carousel.module.css'

export const Slider = ({ products }: { products: ProductTypeCard[] }) => {
    return (
        <div className={styles.carousel}>
            <Swiper
                loop
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                freeMode={{
                    enabled: true,
                    momentum: false,
                }}
                speed={5000}
                spaceBetween={30}
                modules={[Autoplay, Pagination, Navigation, FreeMode]}
                breakpoints={{
                    640: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
                className="mySwiper !py-4">
                {products.map((product: ProductTypeCard) => (
                    <SwiperSlide key={product.slug?.current}>
                        <Card product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
