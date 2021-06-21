import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {

  return(  blogs
    ? <Table striped>
      <tbody>
        {
          blogs.map(blog => { if(blog !== undefined)
            return <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{ blog.title }</Link>
              </td>
            </tr>
          else return null
          })
        }

      </tbody>
    </Table>
    : null
  )
}

export default Blogs