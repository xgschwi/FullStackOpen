import React, {useState} from 'react'

const Blog = ({blog, addLike}) => {

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
    <div style={blogStyle}>
      <p>
         {blog.title} {blog.author}   
         <button onClick={()=> setView(!view)}>View</button>
      </p>
      
      {view ?
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes}
            <button onClick={() => addLike(blog)}>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      : null
      }
    </div>  
  )
}


export default Blog