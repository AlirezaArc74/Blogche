import { useNavigate } from "react-router-dom";
import NotesIcon from "@mui/icons-material/Notes";
import Cookies from "universal-cookie";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import "../../App.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "./SearchModal";
import HeaderNavbar from "./HeaderNavbar";
import HomeBigCard from "../Card-blog/HomeBigCard";

const Header = () => {
  const {
    modal,
    setModal,
    searchModal,
    setSearchModal,
    dropDownModal,
    setDropDownModal,
  } = useContext(UserContext);
  // const [searchModal, setSearchModal] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const dashboardClick = () => {
    navigate("/dashboardlayout");
    if (!cookies.set()) return setModal(true);
  };

  const openSearchModalClick = () => {
    console.log("ddd");
    setSearchModal(true);
  };

  return (
    <>

      <div className="  header-color h-[15rem]  text-[20px] ">

        {/* <div
          onClick={() => navigate("/")}
          className="absolute top-[1.1rem] ml-[2rem] hover:drop-shadow-2xl 
          hover:rounded-[15px] flex	 p-2 hover:bg-cyan-400 hover:text-white  cursor-pointer "
        >
          <NotesIcon />
          <h1 className="ml-2">به اپلیکیشن بلاگ پست خوش آمدید</h1>
        </div>
        <div className="absolute  flex justify-evenly top-[1.1rem] left-[30rem] w-[15rem]">
          <button
           className="hover:rounded-[15px] p-2 hover:bg-cyan-400 hover:text-white  cursor-pointer">
            بلاگ ها
          </button>
          <button
            onClick={() => dashboardClick()}
            className="hover:rounded-[15px] p-2 hover:bg-cyan-400 hover:text-white  cursor-pointer"
          >
            داشبورد
          </button>
        </div>
        <div className="absolute right-[5rem] top-[1.1rem] ">
          <button
            onClick={() => navigate("/login")}
            className="hover:rounded-[15px] p-2 hover:bg-cyan-400 hover:text-white  cursor-pointer"
          >
            ورود / ثبت نام
          </button>
        </div> */}
        <div className="absolute h-[7rem] text-white border-b w-[62rem] ml-[5rem] bg-red- border-neutral-800 ">
          <div className="absolute top-[3rem]     ">
            <InstagramIcon className="mr-2" sx={{ color: "white" }} />
            <YouTubeIcon className="mr-2" sx={{ color: "white" }} />
            <TwitterIcon className="mr-2" sx={{ color: "white" }} />
            <PinterestIcon sx={{ color: "white" }} />
          </div>

          <button
            onClick={() => navigate("/")}
            className=" absolute top-[2rem] left-[31rem] text-white text-[40px] bg-red-   "
          >
            Blogche.
          </button>

          <div
            onClick={() => openSearchModalClick()}
            className="text-white flex absolute right-[0rem] top-[3.4rem] cursor-pointer text-[12px]  "
          >
            <p className="mr-2">search</p>
            <SearchIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div>
          <HeaderNavbar />

        </div>



      </div>
    </>
  );
};

export default Header;
