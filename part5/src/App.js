import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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

  return (

    <div>
      {
        user === null ?
        <LoginForm username = {username} password = {password}
        setUsername = {setUsername} setPassword = {setPassword}
        user = {user} setUser = {setUser}/> :
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
            <button onClick={() => {
              loginService.logout(setUser)
              blogService.setToken('')
              setUser(null)
              }}
              >Logout</button></p>
              <BlogForm setBlogs = {setBlogs}/>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
      
    </div>
  )
}

export default App