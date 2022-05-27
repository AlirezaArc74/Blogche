import { useContext } from "react";
import { UserContext } from "../../UserContext";
import CloseIcon from "@mui/icons-material/Close";



const SearchModal = () => {

const {searchModal, setSearchModal} = useContext(UserContext)
    
    
      const closeSearchModalClick = () => {
        setSearchModal(false);
      };


    return (
        <div className=" ">
            {searchModal ? (
          <>
            <div
              onClick={() => closeSearchModalClick()}
              className=" absolute top-[0rem]   w-[72rem] h-screen bg-neutral-900	 "
            ></div>
            <button
              className="absolute top-[2rem] ml-[36rem] "
              onClick={() => closeSearchModalClick()}
            >
              <CloseIcon sx={{ color: "white" }} />
            </button>

            <div className="absolute left-[22rem] top-[16rem] text-center text-white">
              <label className="text-[15px]  ">search for:</label>
              <div className="mt-4">
                <input
                  placeholder="Type Keywords"
                  className="bg-neutral-900 text-[50px]  border-b border-neutral-800 outline-none w-[30rem] h-[3.8rem] text-black placeholder:tracking-wider	 placeholder:font-medium	 placeholder:text-center placeholder:text-white placeholder:text-[50px] "
                />
              </div>
              <p className="mt-8 text-[13px] text-neutral-500 ">
                Please Enter to begin your search.
              </p>
            </div>
          </>
        ) : null}
        </div>
    )
}

export default SearchModal