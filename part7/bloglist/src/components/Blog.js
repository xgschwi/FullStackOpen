import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [ c, setComment ] = useState('')

  let inc = 0
  if (!blog) return null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  // eslint-disable-next-line no-unused-vars
  const addComment = (e) => {
    e.preventDefault()

    const comment = c

    if(!blog.comments) blog.comments = []

    blog.comments = blog.comments.concat(comment)

    // eslint-disable-next-line no-unused-vars
    blogService.addComment(blog).then(res => {
      setComment('')
    })
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
      <div>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input type='text' name='comment' id='comment' value={c} onChange={({ target }) => setComment(target.value)}/>
          <button type='submit'>Add Comment</button>
        </form>
        {blog.comments
          ? <ul> {
            blog.comments.map(comment => <li key={inc++}>{comment}</li> )
          }
          </ul>
          : <p>No comments Yet</p>
        }
      </div>
    </div>
  )
}


export default Blog