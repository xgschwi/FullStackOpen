import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  return(  blogs
    ? <div>
      {
        blogs.map(blog => { if(blog !== undefined)
          return <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></div>
        else return null
        })
      }

    </div>
    : null
  )
}

export default Blogs