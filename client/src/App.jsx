import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Components/userComponents/Navbar";
import Footer from "./Components/userComponents/Footer";
import Home from "./Components/Screens/Home";
import CreatePost from "./Components/Screens/CreatePost";
import EditPost from "./Components/Screens/EditPost";
import PostDetails from "./Components/Screens/PostDetails";
import Login from "./Components/Screens/Login";
import Register from "./Components/Screens/Register";
import PrivateRoute from "./Components/userComponents/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected — must be logged in */}
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;