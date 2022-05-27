import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import blog2 from "../img/blog2.jpg";
import Spinner from "../components/Waiting-spinner/Spinner";
import falak from "../img/falak.webp";

import constants from "../config/constants";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [waitModal, setWaitModal] = useState(false);
  const [userData, setUserData] = useState();

  const { userId, setUserId } = useContext(UserContext);

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch("http://localhost:4000/user/me", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("ut")} `,
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          // console.log(response);
          // console.log("!!!!");
          return response.json();
        })
        .then((data) => {
          if (data.msg === "Unauthorized") {
            throw new Error("no");
          }
          console.log(data);
          setUserData(data);

          if (data && data._id) setLoading(false);
          setUserId(data._id);
        })
        .catch((err) => {
          console.log("err is : ", err);
          navigate("/login");
        });
    } catch (error) {
      navigate("/login");
    }
  }, []);

  const logoutClick = () => {
    cookies.remove("ut");
    setTimeout(() => navigate("/login"), 3000);
    setWaitModal(true);
  };

  // const image = {
  //   backgroundImage: "url(``)";
  // }

  // console.log(userData?.imgurl)

  // setTimeout(() => console.log('Initial timeout!'), 5000);
  // console.log(userData)

  if (loading)
    return (
      <h1 className="bg-red-0 absolute top-[0rem]">
        Please wait, data is loading
        <di>
          <Spinner />
        </di>
      </h1>
    );

  // if(error)

  return (
    <>
      <div className="">
        {waitModal ? (
          <>
            <div className=" bg-slate-900 text-center   ">
              <Spinner />
            </div>
          </>
        ) : null}

        <div className="absolute text-center right-0 w-[10rem] bg-gray-900 text-white top-0 h-[41.1rem]">
          <div className="mt-4">
            {/* {console.log(userData.avatar)} */}
            {/* {console.log(domain)} */}
            <img
              className="ml-[2.5rem] rounded-[90px] w-[6rem] h-[6rem] mt-[8rem] "
              src={`${constants.domain}/${userData.avatar}`}
            />
            <button
              onClick={() => navigate("/newblog")}
              className="mt-12  p-2 hover:bg-green-600 duration-300  w-[7rem] bg-green-700 rounded-[15px] "
            >
              New Blog Post
            </button>

            
            <br />
            <button
              onClick={() => navigate("/myblog")}
              className="mt-8 p-2 hover:bg-green-600 duration-300  w-[7rem] bg-green-700 rounded-[15px] "
            >
              My Blog
            </button>

            <br />
            <button
              onClick={() => navigate("/edituser")}
              className="mt-8 p-2 hover:bg-green-600 duration-300  w-[7rem] bg-green-700 rounded-[15px] "
            >
              Edit 
            </button>

            <br />

            <button
              onClick={() => navigate("/")}
              className=" absolute top-[2rem] left-[1rem] text-white text-[30px]    "
            >
              Blogche.
            </button>

            <button
              onClick={logoutClick}
              className=" mt-[10.8rem] ml-[-3rem] w-[7rem]  p-2 hover:bg-red-600 duration-300   bg-red-700 rounded-r-xl 	 "
            >
              log out
            </button>
          </div>
        </div>

        {/* <img className="absolute left-[15rem] w-[15rem] sm:w-[60rem] " src={blog2} /> */}
      </div>
      {/* <img
          className="absolute w-[52rem] left-[0rem] h-[41.1rem]  opacity-70 "
          src={falak}
        /> */}
      <Outlet />
    </>
  );
};

export default DashboardLayout;
