import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { Login } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
  const createLogin = async (trimmedName,trimmedEmail,trimmedPassword) => {
    setIsLoading(true);

    if (trimmedName === "" || trimmedEmail === "" || trimmedPassword === "") {
      console.log("cannot be left blank");
      return;
    }
    try {
        const userResponse = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
    
        if (userResponse.user) {
          const docref = doc(db, "users", userResponse.user.uid);
          const docSnap = await getDoc(docref);
    
          if (docSnap.exists()) {
            const userData = docSnap.data(); 
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(Login(userData));
          } else {
            console.log("User document does not exist");
          }
        }
    
        setIsLoading(false);
        navigate("/");
        return userResponse.user;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return { createLogin };
};

export default useLogin;
