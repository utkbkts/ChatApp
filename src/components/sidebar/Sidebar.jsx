import React from 'react'
import Navbar from '../navbar/Navbar'
import Search from '../search/Search'
import Chat from '../chat/Chat'
import "./sidebar.scss"
const Sidebar = () => {
  return (
    <div className='Sidebar-Content'>
      <Navbar/>
      <Search/>
      <Chat/>
    </div>
  )
}

export default Sidebar
