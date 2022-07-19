import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import "../App.css";
import Cookies from "universal-cookie";
import {  useNavigate } from "react-router-dom";
import giutarMan from "../img/guitarman.webp";
import FacebookIcon from "@mui/icons-material/Facebook";
import successToast from '../components/successToast'
import  { Toaster } from "react-hot-toast";
import errorToast from "../components/errorToast";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [showPassword] = useState(false);
  const [learnModal, setLearnModal] = useState(false);

  const { modal } = useContext(UserContext);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const login = () => {
    fetch("http://localhost:4000/user/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: "1111",
      }),
    })
      .then((res) => {
        console.log(res);
        console.log("!!!!");
        return res.json();
      })
      .then(({ token }) => {
        console.log(token);
        if (token) successToast("Your successfully loged in ");
        if (!token) return errorToast('You have no account, please first sign up')
        cookies.set("ut", token);

       setTimeout(() => {
        navigate("/newblog")
       },1000) ;
      });
  };
  console.log(usernameInput)

  // console.log(typeof usernameInput)

  useEffect(() => {
    if (cookies.get("ut")) return navigate("/newblog")
  }, []);
  

  const learnMoreClick = () => {
    console.log("rrrrrr");
    setLearnModal(!learnModal);
  };

 
  return (
    <div className=" h-[41rem] ">
      <Toaster />

      <img alt="gitar man" className="h-screen  w-screen " src={giutarMan} />

      {modal ? (
        <div className="absolute left-[25rem] top-[6rem] bg-red-500 w-[22rem] h-[5rem] rounded-[20px] text-center ">
          <h1 className="mt-8">please first login </h1>
        </div>
      ) : null}
      <div className="absolute top-[0rem] left-[0rem] bg-black w-screen text-center opacity-70">
        <button
          onClick={() => navigate("/")}
          className="  text-white text-[40px] bg-red-   "
        >
          Blogche.
        </button>
      </div>

      <div className="w-[24rem] h-[33rem] bg-black opacity-60 left-[33rem] absolute top-[5rem]"></div>
      <div className=" w-[24rem] h-[32rem] left-[33rem] absolute top-[5rem]">
        <div className="text-white mt-[3rem] ml-[4rem] w-[14rem]  ">
          <h1 className="text-[20px] ">Login</h1>
          <input
            placeholder="Email or phone number"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="mt-2 w-[16rem] h-[2.5rem]   focus:text-10-[px] focus:duration-500	  p-2 placeholder:p-2 bg-gray-600 rounded text-white outline-none "
          />

          <div className="text-white">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-2 w-[16rem] bg-gray-600 h-[2.5rem] focus:duration-500	  p-2  placeholder:p-2 rounded outline-none "
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
            />
            {/* <VisibilityIcon
              className="cursor-pointer ml-2 text-white opacity-80"
              onClick={showPasswordClick}
            /> */}
          </div>

          <button
            onClick={() => login()}
            className="p-2 bg-red-700 rounded w-[16rem] mt-[2rem] "
          >
            Login
          </button>
          <div className="mt-2 relative flex text-[10px] text-gray-400">
            <input className="w-4 " type="checkbox" />
            <p className="">Remember me</p>
            <p className="absolute right-[-.1rem] top-[-.1rem] hover:underline cursor-pointer duration-700 ">
              Need help?
            </p>
          </div>

          <div className="flex mt-[3rem] cursor-pointer text-[12px] text-gray-400 ">
            <FacebookIcon color="primary" />
            <p className="mt-[.2rem] ml-2 ">Login with Facebook</p>
          </div>

          <div className="flex mt-2">
            <p className="text-gray-400">New to Blogche? </p>
            <p
              onClick={() => navigate("/signup")}
              className="ml-1 hover:underline cursor-pointer "
            >
              Sign up now
            </p>
          </div>

          <div className="text-[10px] mt-[.5rem] relative  bg-red- w-[15rem] flex ">
            <p className="text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
              <a
                onClick={learnMoreClick}
                className="text-blue-500 hover:underline cursor-pointer "
              >
                {learnModal ? null : <span>Learn more.</span>}
              </a>
              {learnModal ? (
                <div className="mt-2">
                  The information collected by Google reCAPTCHA is subject to
                  the Google
                  <a className="text-blue-500 hover:underline cursor-pointer">
                    Privacy Policy
                  </a>
                  and
                  <a className="text-blue-500 hover:underline cursor-pointer">
                    Terms of Service
                  </a>
                  , and is used for providing, maintaining, and improving the
                  reCAPTCHA service and for general security purposes (it is not
                  used for personalized advertising by Google).
                </div>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
