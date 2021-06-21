import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addBlog}>
        <Form.Label>Title:</Form.Label>
        <Form.Control type='text' id="title" value={title} name="title"
          onChange={({ target }) => setTitle(target.value)}/>
        <Form.Label>Author:</Form.Label>
        <Form.Control type='text' id="author" value={author} name="author"
          onChange={({ target }) => setAuthor(target.value)}/>
        <Form.Label>Url:</Form.Label>
        <Form.Control type='text' id="url" value={url} name="url"
          onChange={({ target }) => setUrl(target.value)}/>
        <Button variant='primary' type="submit">Add</Button>
      </Form>
    </div>
  )
}

export default BlogForm