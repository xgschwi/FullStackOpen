import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const [login, result] = useMutation(LOGIN, {
       onError: (e) => console.log(e)
   })

   useEffect(() => {
      if (result.data) {
         const token = result.data.login.value
         setToken(token)
         localStorage.setItem('library-user-token', token)

         setPage('authors')
         setUsername('')
         setPassword('')
       }
   }, [result.data, setPage, setToken])

   if (!show) {
      return null
   }

   

   const submit = (e) => {
       e.preventDefault()
       login({ variables: { username, password }})
   }

   return (
      <div>
          <form onSubmit={submit}>
              <div> Username: <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/></div>
              <div> Password: <input type='text' value={password} onChange={({target}) => setPassword(target.value)}/></div>
              <button type='submit'>Login</button>
          </form>

      </div>
   )
}

export default Login