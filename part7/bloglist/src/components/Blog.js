import React from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  if (!blog) return null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  return(
    <div style={blogStyle} className='blog'>
      <p>
        {blog.title} {blog.author}
      </p>

      <div>
        <p>{blog.url}</p>
        <p>Likes {blog.likes}
          <button className='likeBtn' onClick={() => addLike(blog)}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        { user.username === blog.user.username ?
          <button className='deleteBtn' onClick={() => removeBlog(blog)}>Remove</button> :
          null
        }
      </div>

    </div>
  )
}


export default Blog