import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notification, setNotification] = useState(null)
  const [ flag, setFlag] = useState(false)


  const blogFormRef = useRef()

  const blogForm = () => {
    return(
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setBlogs(blogs.concat(res))
      
      setFlag(true)
      setNotification(`A new blog ${res.title} by ${res.author} added`)

    })
    .catch(e => {
      setFlag(false)
      setNotification(e.response.data)

    })

    setTimeout(() => {
      setNotification(null)
      setFlag(false)
    }, 10000)
  }

  return (

    <div>
      <Notification flag = {flag} message = {notification}/>
      {
        user === null ?
        <LoginForm username = {username} password = {password}
        setUsername = {setUsername} setPassword = {setPassword}
        user = {user} setUser = {setUser}
        setFlag = {setFlag} setNotification = {setNotification}/> :
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

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
      
    </div>
  )
}

export default App