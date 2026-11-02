'use client';
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {Swiper as SwiperObject} from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "@/components/index";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props{
    images:string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({images, title, className}: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
        <Swiper
            style={{
            '--swiper-navigation-color': 'black',
            '--swiper-pagination-color': 'black',
            } as React.CSSProperties
            }
            spaceBetween={10}
            navigation={true}
            autoplay={{
                delay: 2500
            }}
            thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
        >
            {
                images.map( image => (
                    <SwiperSlide key={image}>
                        <ProductImage
                            src={image}
                            alt={title}
                            className="rounded-lg object-fill"
                            width={ 1024 }
                            height={ 800 }
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
        >
            {
            images.map( image => (
                <SwiperSlide key={image}>
                    <ProductImage
                        src={image}
                        alt={title}
                        width={ 300 }
                        height={ 300 }
                        className="rounded-lg object-fill"
                    />
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}
