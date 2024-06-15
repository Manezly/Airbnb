'use client';
import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import '../styles/swiper.css';

// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SearchCarousel() {
  const pathname = usePathname();
  return (
    <nav className='container-real bg-white flex carousel-width relative items-center'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className='mySwiper'
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          768: {
            slidesPerGroup: 6,
          },
          1024: {
            slidesPerGroup: 10,
          },
          1400: {
            slidesPerGroup: 15,
          },
        }}
      >
        {slideContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link
              className={`flex flex-col gap-[0.3rem] justify-center opacity-70 items-center h-full border-b-2 border-white hover:border-black/40 hover:opacity-100 mr-6 ${
                pathname === slide.href ? 'filter-highlight' : ''
              }`}
              href={slide.href}
            >
              <Image
                className='size-6'
                src={slide.img}
                width={20}
                height={20}
                alt={slide.alt}
                priority
              />
              <span className='text-xs font-medium'>{slide.text}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='hidden md:block swiper-button-prev custom-swiper-button rounded-full border-black/80 border  p-1'>
        <Image
          src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAuNzU1bC0xNC4zNzQgMTEuMjQ1IDE0LjM3NCAxMS4yMTktLjYxOS43ODEtMTUuMzgxLTEyIDE1LjM5MS0xMiAuNjA5Ljc1NXoiLz48L3N2Zz4='
          width={10}
          height={10}
          priority
          alt='arrow left'
        />
      </div>
      <div className='hidden md:block swiper-button-next custom-swiper-button rounded-full border-black/80 border  p-1'>
        <Image
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-angel-right-thin.png'
          width={10}
          height={10}
          priority
          alt='arrow right'
        />
      </div>
    </nav>
  );
}

const slideContent = [
  {
    href: '/',
    text: 'Icons',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-banknote-2.png',
    alt: 'Icons',
  },
  {
    href: '/national-park',
    text: 'National parks',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2016/96/iconmonstr-weather-94.png',
    alt: 'National parks',
  },
  {
    href: '/catles',
    text: 'Castles',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-44.png',
    alt: 'Castles',
  },
  {
    href: '/lake-front',
    text: 'Lake front',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2014/96/iconmonstr-drop-26.png',
    alt: 'Lake front',
  },
  {
    href: '/cave',
    text: 'Caves',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-5.png',
    alt: 'Caves',
  },
  {
    href: '/omg',
    text: 'OMG!',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-party-2.png',
    alt: 'OMG!',
  },
  {
    href: '/cabin',
    text: 'Cabins',
    img: '	https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-3.png',
    alt: 'Cabins',
  },
  {
    href: '/beachfront',
    text: 'Beachfront',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-coffee-19.png',
    alt: 'Beachfront',
  },
  {
    href: '/',
    text: 'Icons',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-banknote-2.png',
    alt: 'Icons',
  },
  {
    href: '/national-park',
    text: 'National parks',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2016/96/iconmonstr-weather-94.png',
    alt: 'National parks',
  },
  {
    href: '/catles',
    text: 'Castles',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-44.png',
    alt: 'Castles',
  },
  {
    href: '/lake-front',
    text: 'Lake front',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2014/96/iconmonstr-drop-26.png',
    alt: 'Lake front',
  },
  {
    href: '/cave',
    text: 'Caves',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-5.png',
    alt: 'Caves',
  },
  {
    href: '/omg',
    text: 'OMG!',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-party-2.png',
    alt: 'OMG!',
  },
  {
    href: '/cabin',
    text: 'Cabins',
    img: '	https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-3.png',
    alt: 'Cabins',
  },
  {
    href: '/beachfront',
    text: 'Beachfront',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-coffee-19.png',
    alt: 'Beachfront',
  },
  {
    href: '/',
    text: 'Icons',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-banknote-2.png',
    alt: 'Icons',
  },
  {
    href: '/national-park',
    text: 'National parks',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2016/96/iconmonstr-weather-94.png',
    alt: 'National parks',
  },
  {
    href: '/catles',
    text: 'Castles',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-44.png',
    alt: 'Castles',
  },
  {
    href: '/lake-front',
    text: 'Lake front',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2014/96/iconmonstr-drop-26.png',
    alt: 'Lake front',
  },
  {
    href: '/cave',
    text: 'Caves',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-5.png',
    alt: 'Caves',
  },
  {
    href: '/omg',
    text: 'OMG!',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-party-2.png',
    alt: 'OMG!',
  },
  {
    href: '/cabin',
    text: 'Cabins',
    img: '	https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-3.png',
    alt: 'Cabins',
  },
  {
    href: '/beachfront',
    text: 'Beachfront',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-coffee-19.png',
    alt: 'Beachfront',
  },
  {
    href: '/',
    text: 'Icons',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-banknote-2.png',
    alt: 'Icons',
  },
  {
    href: '/national-park',
    text: 'National parks',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2016/96/iconmonstr-weather-94.png',
    alt: 'National parks',
  },
  {
    href: '/catles',
    text: 'Castles',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-44.png',
    alt: 'Castles',
  },
  {
    href: '/lake-front',
    text: 'Lake front',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2014/96/iconmonstr-drop-26.png',
    alt: 'Lake front',
  },
  {
    href: '/cave',
    text: 'Caves',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-5.png',
    alt: 'Caves',
  },
  {
    href: '/omg',
    text: 'OMG!',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-party-2.png',
    alt: 'OMG!',
  },
  {
    href: '/cabin',
    text: 'Cabins',
    img: '	https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-3.png',
    alt: 'Cabins',
  },
  {
    href: '/beachfront',
    text: 'Beachfront',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-coffee-19.png',
    alt: 'Beachfront',
  },
];
