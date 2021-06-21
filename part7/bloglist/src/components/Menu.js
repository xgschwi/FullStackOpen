import React from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, dispatch }) => {

  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/'>Blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>Users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user.name} logged in
            <button onClick={() => {
              loginService.logout()
              blogService.setToken('')
              dispatch(setUser(null))
            }}
            >Logout
            </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu