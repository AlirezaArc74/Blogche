import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import { useContext, useEffect, useState, React } from "react";
import { UserContext } from "../UserContext";
import constants from "../config/constants";

const EachBlog = () => {
  const [ eachBlogData, setEachBlogData ] = useState([])
  const navigate = useNavigate();

  let { id } = useParams();

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

  
  
  console.log(eachBlogData);


  return (
    <>
      <div className=" h-full w-screen  ">
        <div className="relative  top-[4rem]   ml-[15rem] w-[36rem] ">
          <div className=" ">
            <h1 className=" text-center mb-[2rem] font-bold text-[20px]  w-[35rem]">
              {eachBlogData.title}
            </h1>
            <img className="h-[20rem] w-[35rem] mt-[2rem] " src={eachBlogData.imgurl} />
          </div>

          <div className="ml-[15rem] mt-[4rem] ">
            <img
              className="w-[5rem] h-[5rem] rounded-[90px] "
              src={`${constants.domain}/${eachBlogData.creator?.avatar}`}
            />
            <p className="  w-[5rem] mt-[1rem]  text-center">
              {eachBlogData.creator?.username}
            </p>
          </div>
        </div>

        <div className="mt-[6rem]  w-[65rem] ml-[3.5rem] h-fit ">
          <div
            dangerouslySetInnerHTML={{ __html: eachBlogData?.content }}
          ></div>
        </div>


        <button
          onClick={() => navigate(`/editblog/${eachBlogData._id}`)}
          className="mb-[2rem] ml-[3.5rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
        >
          Edit
        </button>

        <button
          onClick={() => navigate("/myblog")}
          className="mb-[2rem] ml-[53.5rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default EachBlog;
