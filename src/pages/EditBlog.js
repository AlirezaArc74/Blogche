import { useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import successToast from "../components/successToast";

const EditBlog = () => {

  const [data, setData] = useState({})

  const cookies = new Cookies();
  const navigate = useNavigate()

  let {id} = useParams()

  console.log(id)


  const editBlog = () => {
    console.log("salam salam");
    fetch("http://localhost:4000/blog/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: data?._id,
        data: {
          title: data.title,
          content: editorRef.current.getContent(),
          imgurl: data.imgurl,
        },
      })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        successToast("Your edit was successfully changed")
        setTimeout(() => {
          navigate(`/blog/${data?._id}`)
        },2000)
      })
  };

  useEffect(() => {
    fetch(`http://localhost:4000/blog/single-blog/${id}`)
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((data) => {
      console.log(data)
      setData(data)
    })
  },[])



  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  return (
    <>
    <Toaster />
      <div className="absolute top-[0rem] left-[4rem]  w-[52rem]   ">
        <div className="relative bg-slate-900 h-28 text-center">
          <div className="absolute top-8 left-8">
            <input
              className="bg-green-700 rounded-md p-2 focus:outline-none placeholder:text-black placeholder:text-[17px] 	"
              placeholder="title"
              value={data.title}
              onChange={(e) => setData({...data, title: e.target.value })}
              type="text"
            />

            <input
              className=" bg-green-700 rounded-md p-2 focus:outline-none ml-[2rem] placeholder:text-black placeholder:text-[17px]	"
              value={data.imgurl}
              onChange={(e) => setData({...data, imgurl: e.target.value})}
              type="text"
              placeholder="Image URL"
            />
          </div>
        </div>

        <div className="absolute  top-[7rem] w-[52rem] left-[0rem] ">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={data.content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <button onClick={log}>Log editor content</button> */}

          <button
            className="mt-[1rem] text-white hover:bg-blue-600 duration-300  w-[6rem] bg-blue-700 rounded-[15px]"
            onClick={() => editBlog()}
          >
            Submit
          </button>

          <button
          onClick={() => navigate(`/blog/${data._id}`)}
          className="absolute bottom-[0rem] right-[0rem] text-white hover:bg-green-600 duration-300  w-[6rem] bg-green-700 rounded-[15px]"
        >
          Back
        </button>
        </div>

        
      </div>
    </>
  );
};

export default EditBlog;
