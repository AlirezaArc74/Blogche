import { useEffect, useState } from "react";
import "../../App.css";
import { RatingStar } from "rating-star";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const HomeCard = () => {
  const [data, setData] = useState([]);
  const [rating, setRating] =useState()

  useEffect(() => {
    fetch("http://localhost:4000/blog/top-blogs")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setData(data);
      });
  }, []);

  const scrollClick = () => {
    console.log('ok')
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    
  }

  const onRatingChange = val => {
    setRating(val);
  };

  // console.log(data)

  return (
    <>
      {/* <div className="absolute  left-[28rem] top-[4rem] bg-white w-[17rem] h-[28rem] animate-pulse	  ">
          <div className="ml-[6.5rem] mt-[1.5rem] ">
            <img className="w-[2rem] fill-gray-400" src={iconQoute} />
          </div>

          <div className="text-center">
            <p className="text-center text-[23px] w-[13rem] ml-4 mt-[2rem]   ">
              Good design is making something intelligible and memorable. Great
              design is making something memorable and meaningful.
            </p>
            <p className="mt-[2rem] text-gray-400 ">Dieter Rams</p>
          </div>
        </div> */}

      {/* <div className="absolute  left-[9rem] top-[4rem] bg-white w-[17rem] h-[39rem] animation-card   ">
          <img src={menPage} />
          <div className="mt-[1.6rem] ml-[2rem] ">
            <p className="text-[11px] text-gray-500 ">December 15, 2017</p>
            <h1 className="text-[19px]  w-[10rem] ">
              Just a Standard Format Post.
            </h1>
            <p className="mt-[1.5rem] w-[13rem]">
              Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
              incididunt mollit id et sit proident dolor nulla sed commodo est
              ad minim elit reprehenderit nisi officia aute incididunt velit
              sint in aliqua...
            </p>

            <div className="text-blue-800 font-semibold ">
              <button className="mt-[2rem] hover:text-black "> Design,</button>
              <button className=" hover:text-black ml-[.2rem] ">
                Photography
              </button>
            </div>
          </div>
        </div> */}
        <div className="fixed top-[38rem] cursor-pointer right-[2rem] ">
          <ArrowCircleUpIcon
          onClick={scrollClick}
           sx={{ fontSize: 50 }}/>
        </div>

      <div className="-red-500 text-black w-[40rem] ml-[17rem] divide-y divide-black ">
        <h1 className="text-[25px] font-bold text-center mt-[1rem] ">
          TOP BLOG POSTS
        </h1>

        {data?.map((item) => {
          // console.log(item.averageScore)
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
                <div className="bg-red- ml-[-1rem]">
                  <RatingStar
                    rating={item.averageScore}
                    // onRatingChange={onRatingChange}
                  />
                  {item.averageScore}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HomeCard;
