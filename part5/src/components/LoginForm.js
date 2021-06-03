import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({username, password, setUsername, setPassword, user, setUser}) => {

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
            setUser(user)
            setUsername('')
            setPassword('')
        } catch(e) {console.log(e)}
    }

    return (
        
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <div>
                username 
                <input value={username} name="Username"
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input value={password} name="Password"
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <div>
                <button type = "submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm