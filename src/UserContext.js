import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [userImage, setUserImage] = useState();
  const [essayTitle, setEssayTitle] = useState();
  const [userId, setUserId] = useState();
  const [blogList, setBlogList] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [dropDownModal, setDropDownModal] = useState(false);
  const [eachBlogData, setEachBlogData] = useState({});

  const findBlogById = (id) => {
    const p = blogList?.findIndex((item) => item._id === id);
    if (p === -1) return null;
    return blogList[p];
  };
  return (
    <UserContext.Provider
      value={{
        modal,
        setModal,
        userImage,
        setUserImage,
        essayTitle,
        setEssayTitle,
        userId,
        setUserId,
        blogList,
        setBlogList,
        findBlogById,
        searchModal,
        setSearchModal,
        dropDownModal,
        setDropDownModal,
        eachBlogData,
        setEachBlogData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
