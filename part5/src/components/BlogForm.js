import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs, setNotification, setFlag}) => {

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

        blogService.create(blog).then(res => {
            blogService.getAll().then(blogs => setBlogs(blogs))
            
            setFlag(true)
            setNotification(`A new blog ${res.title} by ${res.author} added`)


            setTitle('')
            setAuthor('')
            setUrl('')
        })
        .catch(e => {
            setFlag(false)
            setNotification(e.response.data)

        })

        setTimeout(() => {
            setNotification(null)
            setFlag(false)
        }, 10000)
        
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