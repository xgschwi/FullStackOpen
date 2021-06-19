import React from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Menu = ({ user, dispatch }) => {
  const menuStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 350
  }

  const linkStyle = {
    padding: 5
  }

  return(
    <div style={menuStyle}>
      <p>
        <Link style={linkStyle} to='/'>Blogs</Link>
        <Link style ={linkStyle} to='/users'>Users</Link>
        {user.name} logged in
        <button onClick={() => {
          loginService.logout()
          blogService.setToken('')
          dispatch(setUser(null))
        }}
        >Logout
        </button></p>
    </div>
  )
}

export default Menu