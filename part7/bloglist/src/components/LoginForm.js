import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
import { setFlag } from '../reducers/flagReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ username, password, setUsername, setPassword }) => {

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

      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch(e) {
      dispatch(setFlag(false))
      dispatch(notify('Wrong username or password', 5))
    }
  }

  return (

    <Form onSubmit={handleLogin}>
      <Form.Group>
        <h2>Log in to application</h2>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' id='username' value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Label>Password</Form.Label>
        <Form.Control type='password' id='password' value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant='primary' type='submit'>Login</Button>

      </Form.Group>
    </Form>
  )
}

export default LoginForm