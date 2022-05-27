import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const HeaderNavbar = () => {
  const { dropDownModal, setDropDownModal } = useContext(UserContext);

  const navigate = useNavigate()

  const mouseOver = () => {
    setDropDownModal(true);
  };

  const mouseLeave = () => {
    setDropDownModal(false);
  };

  return (
    <>
      <div className="text-white flex justify-evenly  absolute top-[8rem] left-[20rem]  w-[33rem] text-[12px] text-neutral-400  ">
        <ul 
        className="cursor-pointer hover:text-neutral-200 duration-500"
        onClick={() => navigate('/')}>Home</ul>
        <ul className="hover:text-neutral-200 duration-300" onMouseLeave={mouseLeave} onMouseOver={mouseOver}>
          <div className="flex cursor-pointer ">
            Categories
            <div className="">
              {dropDownModal ? (
                <div className="">
                  <ArrowDropUpIcon sx={{ color: "grey" }} />
                </div>
              ) : (
                <ArrowDropDownIcon sx={{ color: "grey" }} />
              )}
            </div>
          </div>
        </ul>

        <ul 
        className="hover:text-neutral-200 duration-500 cursor-pointer"
        onClick={() => navigate("/allblog")}>Blogs</ul>
        <ul 
        onClick={() => navigate('/userblog')}
        className="hover:text-neutral-200 duration-500 cursor-pointer">User Blog</ul>
        <ul 
        onClick={() => navigate('/login')}
        className="hover:text-neutral-200 duration-500 cursor-pointer">Login</ul>
        <ul 
         onClick={() => navigate('/myblog')}
        className="hover:text-neutral-200 duration-500 cursor-pointer">Dashbourd</ul>
      </div>

      {dropDownModal ? (
        <div
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
         className="text-neutral-300 text-[12px] z-10 hover: duration-300 absolute top-[9.4rem] left-[27rem] bg-black ">
          <ul className="hover:text-white cursor-pointer duration-300" >Lifestyle</ul>
          <ul className="hover:text-white cursor-pointer duration-300 ">Family</ul>
          <ul className="hover:text-white cursor-pointer duration-300">Work</ul>
          <ul className="hover:text-white cursor-pointer duration-300">Health</ul>
          <ul className="hover:text-white cursor-pointer duration-300">Management</ul>
          <ul className="hover:text-white cursor-pointer duration-300">Travel</ul>
        </div>
      ) : null}
    </>
  );
};

export default HeaderNavbar;
