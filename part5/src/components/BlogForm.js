import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Add a Blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title: <input value={title} name="title"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
                    Author: <input value={author} name="author"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
                    Url: <input value={url} name="url"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm