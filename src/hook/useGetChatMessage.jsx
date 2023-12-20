import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useSelector } from 'react-redux'
import { Timestamp, arrayUnion, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import {v4 as uuid} from "uuid"
const useGetChatMessage = () => {
    const {data}=useContext(ChatContext)
    const {user}=useSelector((state)=>state.auth)
    const getMessage=async(text)=>{
        const newComment = {
            text,
          };
        await updateDoc(doc(db, "users", user.uid), {
            message: arrayUnion(newComment),
          });
        await updateDoc(doc(db,"chats",data.chatId),{
            message:arrayUnion({
                id:uuid(),
                text,
                senderId:user.uid,
                date:Timestamp.now()
            })
        })
    }
    return{getMessage}
}

export default useGetChatMessage
