import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const UsersGet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, "users"));
            const data = await getDocs(q);

            let array = [];

            data.forEach((doc)=>{
                array.push({...doc.data(),id:doc.id})
            })
              setuserData(array);
            return () => data;
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    getUserProfile();
}, []);

  return { isLoading,userData };
};

export default UsersGet;
