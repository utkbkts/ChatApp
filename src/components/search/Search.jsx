import React, { useState } from 'react';
import "./search.scss";
import useUsersSearch from '../../hook/useUsersSearch';
import useGetCompare from '../../hook/useGetCompare';

const Search = () => {
  const [searchUserInput, setsearchUserInput] = useState("");
  const { getSearch,searchUsers } = useUsersSearch();
  const {handleSelect}=useGetCompare()

  const handlesubmit=(e)=>{
    e.preventDefault();
    getSearch(searchUserInput);

  }
  const handleKey = (e) => {
    const trimmedInput = searchUserInput.trim();
    if (trimmedInput && e.code === "Enter") {
      getSearch(trimmedInput);
    }
  };
  return (
    <div className='search'>
      <form onSubmit={handlesubmit}>
        <input 
          onKeyDown={handleKey} 
          value={searchUserInput} 
          onChange={(e) => setsearchUserInput(e.target.value)} 
          type="text" 
          placeholder='Search...' 
          name="searchUserInput" 
          id="searchUserInput" 
        />
      </form>
      {searchUsers && searchUsers.map(user => (
        <div className='__b' key={user.id} onClick={()=>handleSelect(searchUsers)}>
          <img src={user.profilePic} alt="" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Search;
