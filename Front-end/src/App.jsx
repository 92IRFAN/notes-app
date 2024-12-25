import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateComponent from "./Components/PrivateComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/notes/Home";
import SearchNotes from "./Pages/notes/SearchNotes";
import ReadNote from "./Pages/notes/ReadNote";
import UpdateNote from "./Pages/notes/UpdateNote";
import SignUp from "./Pages/user/SignUp";
import SignIn from "./Pages/user/SignIn";

const App = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        {userData && <Navbar />}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/searchNotes" element={<SearchNotes />} />
            <Route path="/readNote/:id" element={<ReadNote />} />
            <Route path="/updateNote/:id" element={<UpdateNote />} />
          </Route>

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
