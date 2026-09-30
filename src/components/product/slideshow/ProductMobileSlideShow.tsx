'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props{
    images:string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({images, title, className}: Props) => {

  return (
    <div className={className}>
        <Swiper
            style={{
            '--swiper-pagination-color': 'black',
            } as React.CSSProperties
            }
            pagination
            autoplay={{
                delay: 2500
            }}
            modules={[FreeMode, Autoplay, Pagination]}
            className="mySwiperMobile"
        >
            {
                images.map( image => (
                    <SwiperSlide key={image}>
                        <Image
                            width={ 600 }
                            height={ 500 }
                            src={`/products/${ image }`}
                            alt={title}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}
