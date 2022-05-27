import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";

const Footer = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate("https://www.instagram.com/archin_alireza/");
    console.log("ok");
  };
  return (
    <div className="relative h-[5.1rem] bg-gray-800 text-[16px] ">


      <div className="absolute right-4 top-[2rem] flex justify-between text-white bg--500 w-[20rem] ">
        <button className="hover:text-slate-300">درباره ما</button>
        <button className="hover:text-slate-300">قوانین و مقررات</button>
        <button className="hover:text-slate-300">ارتباط با ما</button>
      </div>

      <div className="absolute top-[1.5rem] left-[33rem] flex justify-between bg-red- w-[15rem] ">
        <a target="_blank" href="https://www.instagram.com/archin_alireza/">
          <InstagramIcon fontSize="large" sx={{ color: "white" }} />
        </a>
        <a target="_blank" href="https://www.youtube.com/">
          <YouTubeIcon fontSize="large" sx={{ color: "white" }} />
        </a>
        <a target="_blank" href="https://twitter.com/">
          <TwitterIcon fontSize="large" sx={{ color: "white" }} />
        </a>
      </div>

      <div></div>
    </div>
  );
};

export default Footer;
