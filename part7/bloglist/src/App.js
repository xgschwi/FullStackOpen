import React, { useState, useEffect, useRef } from 'react'


import blogService from './services/blogs'

import userService from './services/users'

import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { notify } from './reducers/notificationReducer'
import { setFlag } from './reducers/flagReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'

// Run backend from part4 code
const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState([])

  const user = useSelector(state => state.user)


  const blogFormRef = useRef()

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  const linkUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogLink = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  //console.log(typeof match.params.id, linkUser, typeof users[0].id)
  // Called to sort and set blog list
  const sortBlog = (bSort) => {
    const sorted = [...bSort].sort((b1, b2) => b2.likes - b1.likes)
    dispatch(setBlogs( sorted ))
  }

  // Displays a collapsible blog form
  const blogForm = () => {
    return(
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  // Retrieves all blogs and list of users
  useEffect(() => {
    blogService.getAll().then(sBlogs => {
      sortBlog(sBlogs)
    }
    )
    userService.getAll().then(userList => {
      setUsers(userList)
    })
  }, [])

  // Retrives logged in user from local storage
  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if(loggedUserJSON) {
        const tUser = JSON.parse(loggedUserJSON)
        dispatch(setUser(tUser))
        blogService.setToken(tUser.token)
      }
    }
    catch(e) {console.log(e)}
  }, [])

  // Adds a blog to view and database
  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blogObj).then(res => {

      sortBlog(blogs.concat(res))

      dispatch(setFlag(true))
      dispatch(notify(`A new blog ${res.title} by ${res.author} added`, 5))

    })
      .catch(e => {
        dispatch(setFlag(false))
        dispatch(notify(e.response.data, 5))
      })
  }

  // Adds a like to a blog
  const addLike = (blog) => {
    blog.likes = blog.likes + 1
    // eslint-disable-next-line no-unused-vars
    blogService.update(blog).then(res => {

      sortBlog(blogs.map(b => b.id !== blog.id
        ? b
        : blog
      ))
    })

  }

  // Removes blog from view and database
  const removeBlog = (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (result)
      // eslint-disable-next-line no-unused-vars
      blogService.remove(blog).then(res => {
        dispatch(setBlogs([...blogs].filter(b => b.id !== blog.id)))
      })
        .catch(e => {
          dispatch(setFlag(false))
          dispatch(notify('Error in deleting blog', 5))
          console.log(e)
        })
  }

  return (

    <div className='container'>
      <Notification/>
      {
        user === null ?
          <LoginForm username = {username} password = {password}
            setUsername = {setUsername} setPassword = {setPassword}
          /> :
          <div>
            <Menu user={user} dispatch={dispatch}/>
            <h2>blogs</h2>

            <Switch>
              <Route path='/blogs/:id'>
                <Blog blog={blogLink} addLike={addLike} removeBlog={removeBlog} user={user}/>
              </Route>
              <Route path='/users/:id'>
                <User user={linkUser}/>
              </Route>
              <Route path='/users'>
                <Users users={users}/>
              </Route>
              <Route exact path='/'>
                {blogForm()}
                <Blogs blogs={blogs}/>
              </Route>
            </Switch>

          </div>
      }

    </div>
  )
}

export default App