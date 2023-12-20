import React, { useContext, useEffect, useState } from "react";
import "./chats.scss";
import Messages from "../messages/Messages";
import Input from "../input/Input";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
const Chats = () => {
  const { data } = useContext(ChatContext);
  const [message, setMessage] = useState([]);
  console.log(message);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessage(doc.data().message);
      }
      return () => {
        unsub();
      };
    });
  }, [data.chatId]);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.username}</span>
      </div>
      <Messages message={message}/>
      <Input />
    </div>
  );
};

export default Chats;
