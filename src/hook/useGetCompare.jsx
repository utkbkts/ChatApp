import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const useGetCompare = () => {
  const { user } = useSelector((state) => state.auth);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = async (searchUsers) => {
    const compareID =
      user.uid > searchUsers[0].uid
        ? user.uid + searchUsers[0].uid
        : searchUsers[0].uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", compareID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", compareID), { message: [] });

        await updateDoc(doc(db, "usersChats", user.uid), {
          [compareID + ".userInformation"]: {
            uid: searchUsers[0].uid,
            username: searchUsers[0].name,
            photoURL: searchUsers[0].profilePic,
          },
          [compareID + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChats", searchUsers[0].uid), {
          [compareID + ".userInformation"]: {
            uid: user.uid,
            username: user.name,
            photoURL: user.profilePic,
          },
          [compareID + ".date"]: serverTimestamp(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: searchUsers });
    } catch (error) {
      console.error("Error in handleSelect:", error);
    }
  };

  return { handleSelect };
};

export default useGetCompare;
