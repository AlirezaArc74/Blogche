import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../App.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const AllBlog = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();
  const [blogList, setBlogList] = useState([]);

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/blog/`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        const xx = data.map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
        setBlogList(xx);
      });
  }, []);

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
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg === "ok") return alert("Thanks for your score!");
        else if (data.msg === "Unauthorized")
          return alert("Please first login");
        else if (data.msg === "bad request: bad input")
          return alert("Please first rate");
        else if (data.msg === "bad request: no such blog exists")
          return alert("we do not have this user");
      });
  };

  // const submitComment = async (id) => {
  //   fetch("http://localhost:4000/comment/submit", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       auth: `ut ${cookies.get("ut")} `,
  //     },
  //     body: JSON.stringify({
  //       text: comment,
  //       blogId: id,
  //     }),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.msg === "ok") return alert("Thanks for commenting");
  //       else if (data.msg === "Unauthorized")
  //         return alert("Please first login");
  //       else if (data.msg === "bad request: bad inputs")
  //         return alert("Please write a comment");
  //     });
  // };

  // const onRatingChange = (value) => {
  //   setRating(value);
  // };

  const scrollClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showTitleClick = (i) => {
    // console.log(i)
    const arr = [...blogList];

    const p = arr.findIndex((item, index) => index === i);
    // console.log(p)
    if (p === -1) return null;

    arr[p].isSelected = true;

    setBlogList(arr);
    // if (p) return setShowTitle(true);
  };

  const hideTitleClick = (i) => {
    const arr = [...blogList];
    const p = arr.findIndex((item, index) => index === i);
    if (p === -1) return;
    arr[p].isSelected = false;

    setBlogList(arr);
  };

  // console.log(blogList);

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className=" mt-[1rem] ml-[1rem] bg--500 text-black text-[20px] sm:text-[30px] lg:text-[40px]    "
      >
        Blogche.
      </button>

      <div className="fixed bottom-[0rem] cursor-pointer right-[2rem] z-40 ">
        <ArrowCircleUpIcon onClick={scrollClick} sx={{ fontSize: 50 }} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="absolute left-[1rem] bottom-[-9.8rem] sm:bottom-[-35.5rem] lg:bottom-[-64.5rem]   xl:bottom-[-56.5rem]  text-white hover:bg-green-600 
        duration-300 z-40  w-[3rem] sm:w-[4.5rem] lg:w-[6rem] bg-green-700 rounded-[15px]"
      >
        Back
      </button>

      <section className="ml-[.5rem] grid grid-cols-4 gap-[2rem]">
        {blogList.map((item, i) => {
          return (
            <div
              onClick={() => navigate(`/eachbloginweb/${item._id}`)}
              className="bg-black w-[5rem] mb-[2rem]  sm:w-[10rem] lg:w-[15rem] h-[5rem] sm:h-[10rem] lg:h-[15rem]  "
            >
              <div
                style={{
                  background: `url(${item.imgurl})`,
                  backgroundSize: "100% 100%",
                }}
                onMouseEnter={() => { return (showTitleClick(i), console.log(i))}}
                onMouseLeave={() => hideTitleClick(i)}
                className="relative w-[5rem] sm:w-[10rem] lg:w-[15rem] mb-[2rem]  h-[5rem] sm:h-[10rem] lg:h-[15rem] duration-500 bg-black  hover:opacity-50 cursor-pointer"
              >
                {item.isSelected ? (
                  <p className="absolute bottom-0 bg-black z-100 opacity-70 text-white w-[5rem] sm:w-[10rem] lg:w-[15rem] h-[5rem] sm:h-[10rem] lg:h-[15rem] text-[7px] sm:text-[14px] lg:text-[20px] ">
                    {item.title}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default AllBlog;

// "1650960017403899717"
