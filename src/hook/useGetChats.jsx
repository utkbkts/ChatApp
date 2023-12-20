import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";

const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [IsLoading,setIsLoading]=useState(false)
  useEffect(() => {
    setIsLoading(true)
    const getSearch = async () => {
      const unsub = onSnapshot(doc(db, "usersChats", user.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user.uid && getSearch();
    setIsLoading(false)
  }, [user.uid]);

  return { chats,IsLoading };
};

export default useGetChats;
