import React from 'react'

const Button = ({ type, text,onClick }) => {
  return (
    <button type={type} onClick={onClick}   className='button'>{text}</button>
  )
}

export default Button