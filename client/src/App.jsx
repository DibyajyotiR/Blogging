import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/userComponents/Navbar";
import Footer from "./Components/userComponents/Footer";
import Home from "./Components/Screens/Home";
import CreatePost from "./Components/Screens/CreatePost";
import EditPost from "./Components/Screens/EditPost";
import PostDetails from "./Components/Screens/PostDetails";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
