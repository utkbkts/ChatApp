import React, { useContext } from "react";
import "./chat.scss";
import useGetChats from "../../hook/useGetChats";
import { ChatContext } from "../../context/ChatContext";
const Chat = () => {
  const { chats, IsLoading } = useGetChats();
  const { dispatch } = useContext(ChatContext);
  if (IsLoading) {
    return <div className="loading">Loading...</div>;
  }

  const handleSelected = (k) => {
    dispatch({ type: "CHANGE_USER", payload: k });
  };
  return (
    <div className="content">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="__a"
          key={chat.id}
          onClick={() => handleSelected(chat[1].userInformation)}
        >
          <div className="__c">
            <img src={chat[1].userInformation.photoURL} alt="" />
            <span>{chat[1].userInformation.username}</span>
          </div>
          <div className="__d">
            <span className="text">{chat[1].endmessage?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
