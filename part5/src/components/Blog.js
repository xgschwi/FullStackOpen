import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  const [view, setView] = useState(false)

  return(
    <div style={blogStyle} className='blog'>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setView(!view)}>View</button>
      </p>

      {view ?
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes}
            <button onClick={() => addLike(blog)}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          { user.username === blog.user.username ?
            <button onClick={() => removeBlog(blog)}>Remove</button> :
            null
          }
        </div>
        : null
      }
    </div>
  )
}


export default Blog