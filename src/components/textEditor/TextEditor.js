import "./TextEditor.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../UserContext";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import successToast from "../successToast";
import errorToast from "../errorToast";

const TextEditor = () => {
  const { essayTitle, setEssayTitle, userImage, setUserImage } =
    useContext(UserContext);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValue, setInitialValue] = useState();

  const navigate = useNavigate();
  const cookies = new Cookies();

  const submitBLog = async () => {
    if (!essayTitle || !editorRef.current.getContent() || !userImage)
      return errorToast("please fill the input");

    console.log("salam salam");
    fetch("http://localhost:4000/blog/write", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        title: essayTitle,
        content: editorRef.current.getContent(),
        imgurl: userImage,
      }),
    })
      .then((response) => {
        console.log(response);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        return response.json();
      })
      .then((data) => {
        if (data.msg === "bad request: bad inputs") {
          throw new Error("Please Write correct data");
        }
        if (data.msg === "ok") return (
          setTimeout(() => {
            navigate("/myblog");
          }, 2000),
          successToast("Your essay was successfully added"),
          setEssayTitle(""),
          setUserImage("")
        )
        setData(data);
        console.log(data);
      });
  };

  console.log(initialValue);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    setTimeout(
      () =>
        setInitialValue("<p>This is the initial content of the editor.</p>"),
      1000
    );
    setTimeout(() => setInitialValue(""), 3100);
  }, []);

  // if (<Editor />) return

  return (
    <div className="App ml-[5rem] ">
      <Toaster />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        disabled={false}
        tinymceScriptSrc="/path/to/tinymce.min.js"
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
        onClick={submitBLog}
      >
        submit
      </button>
    </div>
  );
};

export default TextEditor;
