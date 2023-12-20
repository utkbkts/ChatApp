import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Chats from "../../components/chats/Chats";
import "./home.scss"
const HomePage = () => {
  return (
    <div className="Home-Container">
      <div className="wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="chats-wrapper">
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
