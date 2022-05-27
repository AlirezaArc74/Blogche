import TextEditor from "../components/textEditor/TextEditor";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
const NewBlog = () => {
  const { essayTitle, setEssayTitle, userImage, setUserImage, submitBLog } =
    useContext(UserContext);

  return (
    <>
      <div className=" top-[rem] left-[5rem] w-[52rem]   ">
        <div className="relative left-[5rem] bg--800 h-28 text-center">
          <div className="absolute top-8 ">
            <input
              className="bg-green-700 rounded-md p-2 focus:outline-none placeholder:text-black placeholder:text-[17px] 	"
              placeholder="title"
              value={essayTitle}
              onChange={(e) => setEssayTitle(e.target.value)}
              type="text"
            />

            <input
              className=" bg-green-700 rounded-md p-2 focus:outline-none ml-[2rem] placeholder:text-black placeholder:text-[17px]	"
              value={userImage}
              onChange={(e) => setUserImage(e.target.value)}
              type="text"
              placeholder="Image URL"
            />
          </div>
        </div>
        <TextEditor />
      </div>
    </>
  );
};

export default NewBlog;
