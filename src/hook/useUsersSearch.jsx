import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase/config';


const useUsersSearch = () => {
  const [searchUsers, setSearchUsers] = useState([]);


  const getSearch = async (searchUserInput) => {
    const q = query(collection(db, 'users'), where('name', '==', searchUserInput));

    try {
      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      setSearchUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  return { getSearch, searchUsers };
};

export default useUsersSearch;
