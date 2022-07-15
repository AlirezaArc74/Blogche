import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../App.css";
import "../components/swiper/swiper.css";
import constants from "../config/constants";

const UserBlog = () => {
  const [userData, setUserData] = useState([]);
  const [searchByUserNameInput, setSearchByUserNameInput] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("user");
    fetch("http://localhost:4000/user/")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }, []);


  return (
    <>
      <div className=" text-black bg--500  ">
        <div className="relative bg-white w-screen h-[3rem] border-b border-slate-300  ">
          <button
            onClick={() => navigate("/")}
            className=" ml-[15rem] mt-[.6rem]  text-[20px]    "
          >
            Blogche.
          </button>

          <input
            type="text"
            value={searchByUserNameInput}
            onChange={(e) => setSearchByUserNameInput(e.target.value)}
            className="ml-[14rem] pl-2 mainLoginInput rounded-md h-[1.8rem] w-[12rem] bg-gray-100 outline-none  "
            placeholder="&#61442; Search"
          />

          <div className="absolute top-[.8rem]  right-[11rem] ">
            <HomeIcon color="" />

            <SendIcon
              sx={{ color: "white" }}
              className="rotate-[-29deg] ml-[1rem] stroke-black mb-[.4rem] mr-[1rem] "
            />
            <AddCircleOutlineIcon className="mr-[1rem]" />
            <ExploreIcon className="mr-[1rem]" />
            <FavoriteBorderIcon />
          </div>
        </div>

       
        <div className=" bg-white w-fit mt-[5rem] ml-[8rem] grid grid-cols-3 gap-[1rem] ">
          {userData.map((item) => {
            return (
              <div className="border-black border-2 m-[rem] -red-400">
                <div className="flex">
                  <img
                    src={`${constants.domain}/${item.avatar}`}
                    className="w-[5rem] h-[5rem] m-[1rem] rounded-[90px] "
                    alt="user image"
                  />
                  <h1 className="w-[7rem] ml-[.6rem] mt-[2.5rem] -green-500 ">
                    {item.username}
                  </h1>
                </div>
                <div className="ml-[2rem] ">
                  <h1 className=" mb-[1rem]"> Name: {item.name} </h1>
                  <p className="-blue-400  w-[12rem] h-[7rem]  ">
                    Bio: {item.bio}
                  </p>
                  <button
                    onClick={() => navigate(`/allblog/${item._id} `)}
                    className="mt-[] "
                  >
                    See blogs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div 
      onClick={() => navigate("/")}
      className="absolute p-1 text-center bottom-[0rem] left-[0rem] text-white 
      hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]">
        back
      </div>
    </>
  );
};
export default UserBlog;
