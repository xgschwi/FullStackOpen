import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

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

  return (

    <div>
      {
        user === null ?
        <LoginForm username = {username} password = {password}
        setUsername = {setUsername} setPassword = {setPassword}
        user = {user} setUser = {setUser}/> :
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
      
    </div>
  )
}

export default App