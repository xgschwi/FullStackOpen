import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handlePost = (event) => {
        event.preventDefault()

        const blog = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }
        blogService.create(blog)
        blogService.getAll().then(blogs => setBlogs(blogs))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Add a Blog</h2>
            <form onSubmit={handlePost}>
                <div>
                    Title: <input value={title} name="title"
                    onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    Author: <input value={author} name="author"
                    onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    Url: <input value={url} name="url"
                    onChange={({target}) => setUrl(target.value)}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default BlogForm