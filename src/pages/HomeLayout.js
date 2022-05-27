import { useContext } from "react";
import { Outlet } from "react-router-dom";
import TextEditor from "../components/textEditor/TextEditor";
import { UserContext } from "../UserContext";
import "../App.css";
import Swiper from "../components/swiper/Swiper";
import Footer from "../components/Footer";
import HomeBigCard from "../components/Card-blog/HomeBigCard";
import HomeCard from "../components/Card-blog/HomeCard";
import SearchModal from "../components/headers/SearchModal";
import Header from "../components/headers/Header";

const Home = () => {
  return (
    <>
      <div className="">
      <Outlet />

      <Header />

        <div className="header-color h-[25.5rem] "></div>

        <HomeBigCard />
        <HomeCard />
        <SearchModal />

        {/* <Footer /> */}
      </div>
    </>
  );
};
export default Home;
