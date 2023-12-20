import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import HomePage from "./pages/home/HomePage";
import { useSelector } from "react-redux";

const Home = () => {
  const {user}=useSelector((state)=>state.auth)
  return (
    <Routes>
      <Route path="/" element={user ? <HomePage />:<Navigate to={"/signin"}/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Home;
