import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import constants from "../config/constants";

const MyBlog = () => {
  const [myBlogData, setMyBlogData] = useState([]);

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("gete my blog hastam");
    fetch("http://localhost:4000/blog/my-blogs", {
      method: "GET",
      headers: {
        auth: `ut ${cookies.get("ut")}`,
      },
      // body: '{}'
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("data : ", data);
        setMyBlogData(data);
      });
  }, []);

  // useEffect(() => {
  //   setContent(myBlogData?.map((item) => item.content))

  // }, [])

  // console.log(content);

  // console.log(myBlogData);
  return (
    <>
      <div className="absolute  left-[1rem] over  w-[60rem] h-fit  border-black border-2 ">
        <div className="grid grid-cols-4 gap-[1rem] m-4  ">
          {myBlogData.map((item) => {
            return (
              <>
                <div
                  onClick={() => navigate(`/blog/${item._id}`)}
                  className=" cursor-pointer ml-[rem] p-4 top-[.5rem] hover:bg-slate-700 duration-300 bg-slate-800 w-[13rem] h-fit   "
                >
                  <img className="w-full h-[10rem] " src={item.imgurl} />
                  <div className="mt-[1.6rem]   ml-[0rem] ">
                    <p className="text-[11px] text-gray-500 ">
                      {(item.createdAt)}
                    </p>
                    <h1 className="text-[15px] bg-red-500 w-[10rem] text-white  ">
                      {item.title}
                    </h1>

                    <div className="text-blue-800 font-semibold  w-[6rem] ">
                      <button className="mt-[1rem] hover:underline ">
                        Design,
                      </button>
                      <button className="hover:underline  ml-[.2rem] ">
                        Photography
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div dangerouslySetInnerHTML={{ __html: item?.content }}>  </div> */}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyBlog;
