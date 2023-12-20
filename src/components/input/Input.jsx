import React, { useContext, useState } from "react";
import useGetChatMessage from "../../hook/useGetChatMessage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";

const Input = () => {
  const [text, settext] = useState("");
  const [Img, setImg] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { data } = useContext(ChatContext);
  const { getMessage } = useGetChatMessage();
  const handleSubmit = async () => {
    if (Img) {
      const storagaref = ref(storage, `messageImg/${user.uid}`);
      await uploadBytesResumable(storagaref, Img).then(() => {
        getDownloadURL(storagaref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            message: arrayUnion({
              id: uuid(),
              text,
              sendId: user.uid,
              date: Timestamp.now(),
              photo: downloadURL,
            }),
          });
        });
      });
   
    } else {
      getMessage(text);
    }

    await updateDoc(doc(db,"usersChats",user.uid),{
      [data.chatId+".endmessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    await updateDoc(doc(db,"usersChats",data.user.uid),{
      [data.chatId+".endmessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    settext("")
    setImg(null)
  };

  return (
    <div className="input">
      <input
        value={text}
        onChange={(e) => settext(e.target.value)}
        type="text"
        placeholder="Mesajınızı Yazınız"
      />
      <div className="send">
        <img src={""} alt="" />
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src={"/dowload.png"} alt="" />
        </label>
        <button onClick={handleSubmit}>Gönder</button>
      </div>
    </div>
  );
};

export default Input;
