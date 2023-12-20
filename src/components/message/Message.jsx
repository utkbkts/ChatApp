import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatContext } from "../../context/ChatContext";
import moment from "moment";

const Message = ({ m }) => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [m]);
  return (
    <div ref={ref} className={`message ${m.sendId === user.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={m.senderId === user.uid ? user.profilePic : data.user.photo}
        />
        <span>{moment(new Date(m.date.toDate())).fromNow()}</span>
      </div>
      <div className="messageContent">
        <p>{m.text}</p>
        {m.photo && <img src={m.photo} />}
      </div>
    </div>
  );
};

export default Message;
