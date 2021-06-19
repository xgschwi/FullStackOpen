import React from 'react'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h3>{ user.name }</h3>
      <h4>Added Blogs</h4>
      <ul>
        { user.blogs.map(blog => <li key={blog.title}>{ blog.title }</li>)}
      </ul>
    </div>
  )
}

export default User