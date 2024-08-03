'use client';
import React, { Suspense, useRef, useState } from 'react';

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
import { useSearchParams } from 'next/navigation';
import AddSearchParameterButton from './search-components/add-search-parameter-button';

export default function SearchCarousel() {
  const searchParams = useSearchParams();
  const currentPropertyType = searchParams.get('propertyType') || '';
  // console.log('nope', currentPropertyType);
  // console.log('hope', slideContent[1].propertyType);
  return (
    <nav className='container-real bg-white flex carousel-width relative items-center '>
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
            {/* <Link
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
            </Link> */}
            <Suspense fallback={<div>Loading...</div>}>
              <AddSearchParameterButton
                parameter='propertyType'
                value={slide.propertyType}
              >
                <div
                  className={`flex flex-col gap-[0.3rem] justify-center items-center h-full border-b-2 ${
                    currentPropertyType === slide.propertyType
                      ? 'border-black opacity-100'
                      : 'border-white opacity-70'
                  } hover:border-black/40 hover:opacity-100 mr-6`}
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
                </div>
              </AddSearchParameterButton>
            </Suspense>
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
    text: 'All',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-banknote-2.png',
    alt: 'All',
    propertyType: '',
  },
  {
    href: '/search/Windmill',
    text: 'Windmill',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2016/96/iconmonstr-weather-94.png',
    alt: 'Windmill',
    propertyType: 'Windmill',
  },
  {
    href: '/search/castle',
    text: 'Castles',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-44.png',
    alt: 'Castles',
    propertyType: 'Castle',
  },
  {
    href: '/search/guest-house',
    text: 'Guest house',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2014/96/iconmonstr-drop-26.png',
    alt: 'guest house',
    propertyType: 'Guest house',
  },
  {
    href: '/cave',
    text: 'Caves',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-5.png',
    alt: 'Caves',
    propertyType: 'Caves',
  },
  {
    href: '/omg',
    text: 'OMG!',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-party-2.png',
    alt: 'OMG!',
    propertyType: 'OMG',
  },
  {
    href: '/cabin',
    text: 'Cabins',
    img: '	https://cdns.iconmonstr.com/wp-content/releases/preview/2017/240/iconmonstr-building-3.png',
    alt: 'Cabins',
    propertyType: 'Cabins',
  },
  {
    href: '/beachfront',
    text: 'Beachfront',
    img: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-coffee-19.png',
    alt: 'Beachfront',
    propertyType: 'Beachfront',
  },
];
