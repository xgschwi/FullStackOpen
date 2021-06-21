import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => (
  users
    ? <div>
      <h3>Users</h3>
      <Table striped>
        <tbody>
          <tr>
            <th>Users</th><th>Blogs created</th>
          </tr>
          {
            users.map(user =>
              <tr key={user.name}>
                <td><Link to={`users/${ user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
    : null
)

export default Users