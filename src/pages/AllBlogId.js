import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RatingStar } from "rating-star";
import Cookies from "universal-cookie";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import constants from "../config/constants";
import "../App.css";

const AllBlogId = () => {
  const [blogData, setBlogData] = useState([]);
  const [userData, setUserData] = useState();

  let { id } = useParams();
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/blog/by-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        setBlogData(data);
        const x = data.map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
        setBlogData(x);
      });
  }, []);

  // console.log(blogData);

  useEffect(() => {
    fetch(`http://localhost:4000/user/singleUser/${id}`)
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        setUserData(data);
      });
  }, []);

 

  

  const scrollClick = () => {
    console.log("ok");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  

  const showTitleClick = (i) => {
    const arr = [...blogData];

    const p = arr.findIndex((item, index) => index == i);
    if (p === -1) return;

    arr[p].isSelected = true;

    setBlogData(arr);
  };

  const hideTitleClick = (i) => {
    const arr = [...blogData];
    const p = arr.findIndex((item, index) => index == i);
    if (p === -1) return;

    arr[p].isSelected = false;

    setBlogData(arr);
  };

  // console.log(userData);
  // console.log(rating);

  if (blogData == 0)
    return (
      <div>
        sorry this user has not any blog post
        <button
          onClick={() => navigate("/userblog")}
          className="fixed mb-[2rem] ml-[53.5rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
        >
          Back
        </button>
      </div>
    );

  return (
    <>
      <div className="fixed top-[38rem] cursor-pointer right-[2rem] ">
        <ArrowCircleUpIcon onClick={scrollClick} sx={{ fontSize: 50 }} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="  text-black text-[40px]"
      >
        Blogify.
      </button>

      <button
        onClick={() => navigate("/userblog")}
        className="fixed mb-[2rem] ml-[53.5rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
      >
        Back
      </button>

      <section className="relative -red-500 h-[11rem] ">
        <div className="absolute left-[10rem] top-[1rem] w-[23rem] -green-500 flex justify-between ">
          <img
            className="w-[7rem] h-[7rem] rounded-[90px] ml-[rem]  "
            src={`${constants.domain}/${userData?.avatar}`}
          />
          <div className="-blue-500">
            <p className="text-center text-[20px] mb-[1rem] ">
              {" "}
              {userData?.username}{" "}
            </p>
            <div className="flex justify-between -yellow-500 w-[10rem] mb-[1rem] ">
              <p>{userData?.blogs.length} posts </p>
              <p> {userData?.averageScore} score </p>
            </div>
            <p className="font-bold"> {userData?.name} </p>
            <p className=" -red-400 w-[9rem] h-fit "> {userData?.bio} </p>
          </div>
        </div>
      </section>

      <section className="ml-[1rem] mt-[4rem] grid grid-cols-4 gap-[2rem]">
        {blogData.map((item, i) => {
          // console.log(item.isSelected);
          return (
            <div
              onClick={() => navigate(`/eachbloginweb/${item._id}`)}
              className="bg-black w-[15rem] "
            >
              <div
                style={{
                  background: `url(${item.imgurl})`,
                  backgroundSize: "100% 100%",
                }}
                onMouseEnter={() => showTitleClick(i)}
                onMouseLeave={() => hideTitleClick(i)}
                className="relative w-[15rem] h-[15rem] duration-500 bg-black  hover:opacity-50 cursor-pointer"
              >
                {item.isSelected ? (
                  <p className="absolute bottom-0 bg-black z-100 opacity-70 text-white ">
                    {item.title}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>

      {/* <div className="-red-500 text-black w-[40rem] ml-[17rem] divide-y divide-black ">
        {data.map((item) => {
          return (
            <>
              <div className=" mb-[3rem] ml-[rem] ">
                <h1 className="  mt-[2rem] font-bold text-[20px] mb-[.6rem] w-[35rem]  -blue-500 ">
                  {item.title}
                </h1>
                <div className="mb-[2rem]">
                  <p> data: {item.createdAt.slice(0, 10)} </p>
                  <p> update: {item.updatedAt.slice(0, 10)} </p>
                </div>

                <img
                  className=" mb-[2rem]  h-[25rem] w-[40rem]  "
                  alt="image of essay"
                  src={item.imgurl}
                />
                <div
                  className="-yellow-500 w-[40rem]"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>

                <div className="flex justify-between -pink-500 w-[40rem] mt-[1rem] ">
                  <p className="mt-[.6rem]">Please Rate:</p>
                  <RatingStar
                    id="clickable"
                    clickable
                    rating={rating}
                    onRatingChange={onRatingChange}
                  />
                  <button
                    className="mt-[.6rem] text-white hover:bg-blue-600 duration-300 h-[1.5rem] w-[6rem] bg-blue-700 rounded-[15px]"
                    onClick={() => submitRate(item._id)}
                  >
                    submit
                  </button>
                </div>

                <div className="flex justify-between -orange-500 w-[40rem] mt-[1rem] mb-[0rem]  ">
                  <p> write your comment</p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-[.6rem] text-white hover:bg-blue-600 duration-300 h-[1.5rem] w-[6rem] bg-blue-700 rounded-[15px]"
                    onClick={() => submitComment(item._id)}
                  >
                    submit
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div> */}
    </>
  );
};

export default AllBlogId;
