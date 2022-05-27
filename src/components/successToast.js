import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import toast, {Toaster} from "react-hot-toast";



  const successToast = (msg) =>
  toast(msg, {
    duration: 2000,
    position: "top-right",
    style: {
      background: "#96F58E",
    },
    icon: <CheckCircleIcon sx={{ color: green[800] }} />,
  });

  export default successToast