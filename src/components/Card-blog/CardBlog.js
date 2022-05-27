import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";


import "./CardBlog.css"


const CardBlog = () => {

  const {blogList, setBlogList} = useContext(UserContext)

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {blogList?.map((item) => {
          console.log(item)
          return (
            <>
            <h1> {item.username} </h1>
            <SwiperSlide> {item.title} jjj </SwiperSlide>
            </>
          )
        })}
        
        {/* <SwiperSlide>Slide 2</SwiperSlide> */}
        {/* <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  )
};

export default CardBlog