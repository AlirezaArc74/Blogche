import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../components/headers/Header";
import carCard from "../img/car-Card-big.webp";

const SignUp = () => {
  const [nameInput, setNameInput] = useState("Alireza");
  const [userNameInput, setUserNameInput] = useState("arc");
  const [passwordInput, setPasswordInput] = useState();
  const [imageInput, setImageInput] = useState(1234);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const submitUser = async () => {
    fetch("http://localhost:4000/user/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgurl: imageInput,
        username: userNameInput,
        name: nameInput,
      }),
    })
      .then((data) => {
        console.log(data);
        console.log("!!!!");
        return data.json();
      })
      .then(({ token }) => {
        if (!token) return alert("please do it again");
        console.log(token);

        cookies.set("ut", token);

        navigate("/newblog");
      });
  };

  return (
    <div className="">
      <img className="h-[41rem] w-screen " src={carCard} />

      <div className="absolute top-[0rem] left-[0rem] bg-black w-screen text-center opacity-70">
        <button
          onClick={() => navigate("/")}
          className="  text-white text-[40px] bg-red-   "
        >
          Blogche.
        </button>
      </div>

      <div className="absolute left-[26rem] top-[7rem] bg-black w-[24rem] h-[30rem] opacity-70 "></div>
      {/* <div className="absolute left-[26rem] top-[7rem] ">
        <h1 className="bg-red-400 w-[20rem] mt-6 text-center">Sign Up</h1>
        <div className="m-4">
          <label>Name</label>
          <div className="mt-2">
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
        </div>
        <div className="m-4">
          <label>Username</label>
          <div className="mt-2">
            <input
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
          </div>
        </div>
       
        <div className="m-4">
          <label>Image Url</label>
          <div className="mt-2">
            <input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
            />
          </div>
        </div>

        <button
          className="ml-[6rem] mt-4 p-2 bg-cyan-700 rounded-[15px] hover:bg-cyan-500 hover:text-white"
          onClick={() => submitUser()}
        >
          Submit User
        </button> */}
      {/* </div> */}

      <div className=" w-[24rem] h-[32rem] left-[26rem] absolute top-[5rem]">
        <div className="text-white mt-[3rem] ml-[4rem] w-[14rem]  ">
          <h1 className="text-[20px] ">Sign Up</h1>
          <input
            placeholder="Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={20}
            className="mt-2 w-[16rem] h-[2.5rem]   focus:text-10-[px] focus:duration-500	  p-2 placeholder:p-2 bg-gray-600 rounded text-white outline-none "
          />

          <div className="text-white">
            <input
              className="mt-2 w-[16rem] bg-gray-600 h-[2.5rem] focus:duration-500	  p-2  placeholder:p-2 rounded outline-none "
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder="UserName"
              maxLength={20}
            />

            {/* <VisibilityIcon
              className="cursor-pointer ml-2 text-white opacity-80"
              onClick={showPasswordClick}
            /> */}
          </div>

          {/* <div className="text-white">
            <input
              className="mt-2 w-[16rem] bg-gray-600 h-[2.5rem] focus:duration-500	  p-2  placeholder:p-2 rounded outline-none "
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Image URL"
            />
          </div> */}

          <button
            onClick={() => submitUser()}
            className="p-2 bg-red-700 rounded w-[16rem] mt-[2rem] "
          >
            Submit
          </button>
          <div className="mt-2 relative flex text-[10px] text-gray-400">
            <input className="w-4 " type="checkbox" />
            <p className="">Remember me</p>
            <p className="absolute right-[-.1rem] top-[-.1rem] hover:underline cursor-pointer duration-700 ">
              Need help?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
