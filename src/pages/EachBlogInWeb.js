import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import constants from "../config/constants";
import { RatingStar } from "rating-star";
import Cookies from "universal-cookie";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Toaster } from "react-hot-toast";
import successToast from "../components/successToast";
import errorToast from "../components/errorToast";


const EachBlogInWeb = () => {
  const [eachBlogData, setEachBlogData] = useState({});
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [commentData, setCommentData] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${id}`)
      .then((Response) => {
        console.log(Response);
        return Response.json();
      })
      .then((data) => {
        // console.log(data);
        setEachBlogData(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/comment/by-blog/${id}`)
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setCommentData(data);
      });
  }, []);
  console.log(commentData);

  const submitRate = async (id) => {
    console.log("333");
    fetch("http://localhost:4000/blog/submit-rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")} `,
      },
      body: JSON.stringify({
        blogId: id,
        score: rating,
      }),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") return successToast("Thanks for your score!");
        else if (data.msg === "Unauthorized")
          return successToast("Please first login");
        else if (data.msg === "bad request: bad input")
          return errorToast("Please first rate");
        else if (data.msg === "bad request: no such blog exists")
          return errorToast("we do not have this user");
      });
  };

  const submitComment = async (id) => {
    fetch("http://localhost:4000/comment/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")} `,
      },
      body: JSON.stringify({
        text: comment,
        blogId: id,
      }),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") return successToast("Thanks for commenting");
        else if (data.msg === "Unauthorized")
          return successToast("Please first login");
        else if (data.msg === "bad request: bad inputs")
          return errorToast("Please write a comment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRatingChange = (value) => {
    setRating(value);
  };

  const scrollClick = () => {
    console.log("ok");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // console.log(eachBlogData);

  const date = new Date(eachBlogData.createdAt);
  const month = new Date(eachBlogData.createdAt);
  const year = new Date(eachBlogData.createdAt);

  // const newArr = [...date]
  // console.log( month.getUTCMonth())

  return (
    <>
    <Toaster />
      <div className="fixed top-[38rem] cursor-pointer right-[2rem] ">
        <ArrowCircleUpIcon onClick={scrollClick} sx={{ fontSize: 50 }} />
      </div>

      <div className=" h-full w-screen  ">
        <div className="relative  top-[4rem]   ml-[15rem] w-[36rem] ">
          <div className=" ">
            <h1 className=" text-center mb-[2rem] font-bold text-[20px]    w-[35rem]">
              {eachBlogData.title}
            </h1>
            <img
              className="h-[20rem] w-[35rem] mt-[2rem] "
              src={eachBlogData.imgurl}
            />
          </div>

          <div className="ml-[12rem] mt-[2.5rem] -blue-500 flex -red-400 w-[20rem] ">
            <img
              className="w-[5rem] h-[5rem] rounded-[90px] "
              src={`${constants.domain}/${eachBlogData.creator?.avatar}`}
            />
            <div className="-red-500 ml-[1rem] -red-500  w-[15rem]">
              <p className="   mt-[1rem]   ">
                writer: {eachBlogData.creator?.name}
              </p>
              <p className="ml-[rem] ">
                date: {date.getDate()} /{month.getMonth()} /{year.getFullYear()}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[6rem]  w-[35rem] ml-[15rem] h-fit -red-500 ">
          <div dangerouslySetInnerHTML={{ __html: eachBlogData.content }}></div>
        </div>
      </div>

      <div className="flex justify-between -pink-500 w-[35rem] mt-[1rem] ml-[15rem] ">
        <p className="mt-[.6rem]">Please Rate:</p>
        <RatingStar
          id="clickable"
          clickable
          rating={rating}
          onRatingChange={onRatingChange}
        />
        <button
          className="mt-[.6rem] text-white hover:bg-blue-600 duration-300 h-[1.5rem] w-[6rem] bg-blue-700 rounded-[15px]"
          onClick={() => submitRate(eachBlogData._id)}
        >
          submit
        </button>
      </div>

      <div className="bg-red- w-[21.2rem] flex justify-between ml-[15rem] ">
        <h1 className="mt-[.6rem]"> {eachBlogData.creator?.name} rate's </h1>
        <RatingStar rating={eachBlogData.averageScore} />
      </div>

      <div className="flex justify-between -orange-500 w-[35rem] mt-[2rem] ml-[15rem] mb-[0rem]  ">
        <p> write your comment</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="mt-[.6rem] text-white hover:bg-blue-600 duration-300 h-[1.5rem] w-[6rem] bg-blue-700 rounded-[15px]"
          onClick={() => submitComment(eachBlogData._id)}
        >
          submit
        </button>
      </div>

      <div className="-red-500 w-[35rem] ml-[15rem] mt-[1rem]  divide-y divide-black ">
        <h1 className="font-bold  mb-[.5rem]"> comments </h1>
        {commentData.map((item) => {
          return (
            <>
              <div className="flex bg-red- justify-between">
                <p className="mb-[.5rem]"> {item.text} </p>
                <p> writer: {item.user?.name} </p>
              </div>
            </>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/allblog")}
        className="mb-[2rem] ml-[53.5rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
      >
        Back
      </button>
    </>
  );
};

export default EachBlogInWeb;
