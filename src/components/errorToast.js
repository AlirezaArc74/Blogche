import toast from "react-hot-toast";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { red } from "@mui/material/colors";



const errorToast = (msg) =>
  toast(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#FB8377",
    },
    icon: <ErrorOutlineIcon sx={{ color: red[800] }} />,
  });

export default errorToast
