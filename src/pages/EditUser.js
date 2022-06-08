import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import constants from "../config/constants";
import "../App.css";
import blog from "../img/blog2.jpg";
import { Toaster } from "react-hot-toast";
import errorToast from "../components/errorToast";
import successToast from "../components/successToast";

const EditUser = () => {
  const [userData, setUserData] = useState({});
  // const [hasnewimage, setnewimage] = useState(false)
  const [image, setimage] = useState("");

  const [file, setFile] = useState(null);

  const cookies = new Cookies();

  const submitAvatar = async () => {
    console.log("loool");
    try {
      if (!file) return errorToast("Please choose a picture first");

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("ut")}`,
        },
        body: formData,
      })
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(".then 2womi : ", data);
          if (data.msg === "ok") {
            setTimeout(
              () => window.location.assign(window.location.href),
              2000
            );
            return successToast("your profile was successfully changed");
          }
        });
    } catch (error) {
      console.log("lol");
    }
  };

  console.log(userData.bio);

  const editUser = () => {
    // console.log("salam salam");
    fetch("http://localhost:4000/user/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        avatar: " file",
        name: userData.name,
        bio: userData.bio,
      }),
    })
      .then((res) => {
        console.log("!!!!");
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") successToast("Successful");
        if (data.msg === "bad input") errorToast("please fill the input");
      });
  };

  const handlePictureLoad = (e) => {
    const filetoload = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = async function (fileloadedevent) {
      setimage(fileloadedevent.target.result);
    };

    fileReader.readAsDataURL(filetoload);

    console.log(e.target.files);
    setFile(filetoload);
  };

  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")} `,
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg === "Unathorized") {
          throw new Error("no");
        }
        setUserData(data);
        setimage(`${constants.domain}/${data.avatar}`);
      })
      .catch((err) => {
        console.log("err is : ", err);
      });
  }, []);

  // const img = `${constants.domain}/${userData?.avatar}`;

  // console.log(userData);
  return (
    <>
      <div className="relative  w-[52rem] h-screen ">
        <Toaster />
        <div className="text-black h-[12rem] absolute top-[4rem] w-[45rem] left-[7rem] flex ">
          <input
            type="file"
            className={`my_file  `}
            id="myinput"
            style={{ display: "none" }}
            onChange={handlePictureLoad}
          />
          <label htmlFor="myinput">
            <img
              src={image}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onError={(e) => {
                e.target.src =
                  "https://p.kindpng.com/picc/s/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png";
              }}
            />
          </label>

          <p className="mt-[2rem] ml-[3rem] h-[2rem] text-[20px] ">
            {userData?.username}
          </p>
          <button
            onClick={() => submitAvatar()}
            className=" text-blue-800 bg-red-  h-[2rem] mt-[5.5rem] w-[10rem] ml-[-4rem] "
          >
            submit your change
          </button>
        </div>

        <div className="relative w-[22rem] bg-red- top-[14rem] text-black left-[8.3rem]  ">
          <label> Name </label>
          <input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="absolute pl-2  border-solid border-2 ml-[4rem] w-[15rem] text-black "
            type="text"
          />
          <p className="mt-[1rem] text-[10px] ml-[6.3rem]   w-[15rem] ">
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </p>

          <div className="mt-[2rem]  ">
            <label>Bio</label>
            <textarea
              type="text"
              maxLength={100}
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              className="relative pl-2 resizee	 border-solid border-2 ml-[5rem] w-[15rem] text-black"
            />
            <div className="mt-[1rem] absolute  text-[10px] ml-[6.3rem]   w-[15rem]">
              <h2 className="text-[13px] ">Personal Information</h2>
              <p>
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
            </div>
          </div>
        </div>

        <br />

        <button
          onClick={() => editUser()}
          className="p-1  absolute bottom-[6rem] left-[14rem] hover:bg-blue-800 duration-300  w-[7rem] bg-blue-600 rounded-[15px]"
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default EditUser;
