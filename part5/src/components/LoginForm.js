import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ username, password, setUsername, setPassword, setUser, setFlag, setNotification }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setFlag(true)
      setNotification('Successfully signed in!')

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      setFlag(false)
      setNotification('Wrong username or password')
    }

    setTimeout(() => {
      setNotification(null)
      setFlag(false)
    }, 5000)
  }

  return (

    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
                username
        <input id='username' value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input id='password' value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button id='submitLogin' type = "submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm