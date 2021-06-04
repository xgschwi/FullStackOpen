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

  const addLike = (blog) => {
    blog.likes = blog.likes + 1
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
    blogService.remove(blog).then(res => {
      setBlogs([...blogs].filter(b => b.id !== blog.id))
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