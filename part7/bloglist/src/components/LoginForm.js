import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
import { setFlag } from '../reducers/flagReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ username, password, setUsername, setPassword, setUser }) => {

  const dispatch = useDispatch()

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

      dispatch(setFlag(true))
      dispatch(notify('Successfully signed in!', 5))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      dispatch(setFlag(false))
      dispatch(notify('Wrong username or password', 5))
    }
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