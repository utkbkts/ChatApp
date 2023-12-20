import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import {doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { Login } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { useState } from "react";

const useCreateSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const signupCreate = async (Form, selectedFile) => {
    setLoading(true)
    if (!Form.email || !Form.password || !Form.name) {
      console.log("Error", "Please fill all the fields", "error");
      return;
    }
    try {
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        Form.email,
        Form.password
      );
      if (userResponse.user) {
        const storagaref = ref(storage,`userProfile/${userResponse.user.uid}`)
        await uploadBytesResumable(storagaref, selectedFile);
        const downloadURL = await getDownloadURL(storagaref);
        await updateProfile(userResponse.user, {
            displayName: Form.name,
            photoURL: downloadURL,
          });
        const userDoc = {
          uid: userResponse.user.uid,
          email: Form.email,
          name: Form.name,
          profilePic: downloadURL,
          message: [],
          createdAt: Date.now(),
        };
      
        await setDoc(doc(db, "users", userResponse.user.uid), userDoc);
        await setDoc(doc(db,"usersChats",userResponse.user.uid),{})
        localStorage.setItem("user", JSON.stringify(userDoc));
        dispatch(Login(userDoc));
        navigate("/");
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return { signupCreate ,loading};
};

export default useCreateSignUp;
