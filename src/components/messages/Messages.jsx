import React from "react";
import "./message.scss";
import Message from "../message/Message";
const Messages = ({ message }) => {
  return (
    <div className="messages">
      {message.map((m) => (
        <Message m={m} key={m.id}/>
      ))}
    </div>
  );
};

export default Messages;
