import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiper.css";

import { Autoplay, Pagination, Navigation } from "swiper";

import blog1 from '../../img/Blog.jpg'
import blog2 from '../../img/blog2.jpg'
import blog3 from '../../img/blog3.jpg'

const swiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide> <img src={blog1} /> </SwiperSlide>
        <SwiperSlide><img src={blog2} /></SwiperSlide>
        <SwiperSlide> <img src={blog3} /> </SwiperSlide>
      </Swiper>
    </>
  );
};

export default swiper;
