import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog";
import HomeLayout from "./pages/HomeLayout";
import DashboardLayout from "./pages/DashboardLayout";
import SignUp from "./pages/SignUp";
import EditBlog from "./pages/EditBlog";
import AllBlog from "./pages/AllBlog";
import EachBlog from "./pages/EachBlog";
import MyBlog from "./pages/MyBlog";
import UserBlog from "./pages/UserBlog";
import EditUser from "./pages/EditUser";
import AllBlogId from "./pages/AllBlogId";
import EachBlogInWeb from "./pages/EachBlogInWeb";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeLayout />}/>
            <Route path="allblog" element={<AllBlog />} />
            <Route path="userblog" element={<UserBlog />} />
            <Route path="allblog/:id" element={<AllBlogId />} />
            <Route path="eachbloginweb/:id" element={<EachBlogInWeb />} />


            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route  element={<DashboardLayout />}>
              <Route path="blog/:id" element={<EachBlog />} />
              <Route path="myblog" element={<MyBlog />} />
              <Route path="newblog" element={<NewBlog />} />
              <Route path="editblog/:id" element={<EditBlog />} />
              <Route path="edituser" element={<EditUser />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
};

export default App;
