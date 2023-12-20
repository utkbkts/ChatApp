import React from "react";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCLickLogout = async () => {
    await signOut(auth);
    await dispatch(Logout());
    navigate("/signin");
  };
  return (
    <div className="Navbar-Container">
      <div className="wrapper-container">
        <h1>ChatApp</h1>
      </div>
      <div className="span-wrapper">
        <img src={user?.profilePic} alt="" />
        <span>{user?.name}</span>
        <button onClick={handleCLickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
