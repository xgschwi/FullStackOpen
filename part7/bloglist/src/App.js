import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { notify } from './reducers/notificationReducer'
import { setFlag } from './reducers/flagReducer'
import { useDispatch } from 'react-redux'

// Run backend from part4 code
const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  // Called to sort and set blog list
  const sortBlog = (bSort) => {
    const sorted = [...bSort].sort((b1, b2) => b2.likes - b1.likes)
    setBlogs( sorted )
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  useEffect(() => {
    blogService.getAll().then(sBlogs => {
      sortBlog(sBlogs)
    }
    )
  }, [])

  useEffect(() => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }
    catch(e) {console.log(e)}
  }, [])

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blogObj).then(res => {

      sortBlog(blogs.concat(res))
      //setBlogs(blogs.concat(res))

      dispatch(setFlag(true))
      dispatch(notify(`A new blog ${res.title} by ${res.author} added`, 5))

    })
      .catch(e => {
        dispatch(setFlag(false))
        dispatch(notify(e.response.data, 5))
      })
  }

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

  const removeBlog = (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (result)
      // eslint-disable-next-line no-unused-vars
      blogService.remove(blog).then(res => {
        setBlogs([...blogs].filter(b => b.id !== blog.id))
      })
        .catch(e => {
          dispatch(setFlag(false))
          dispatch(notify(e.response.data, 5))
        })
  }

  return (

    <div>
      <Notification/>
      {
        user === null ?
          <LoginForm username = {username} password = {password}
            setUsername = {setUsername} setPassword = {setPassword}
            setUser = {setUser}/> :
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
              <button onClick={() => {
                loginService.logout(setUser)
                blogService.setToken('')
                setUser(null)
              }}
              >Logout
              </button></p>

            {blogForm()}

            {blogs.map(blog => { if(blog !== undefined)
              return <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
            else return null
            })}
          </div>
      }

    </div>
  )
}

export default App