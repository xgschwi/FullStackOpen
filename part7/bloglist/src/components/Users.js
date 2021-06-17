import React from 'react'

const Users = ({ users }) => (
  users
    ? <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>Users</th><th>Blogs created</th>
          </tr>
          {
            users.map(user =>
              <tr key={user.name}>
                <td>{user.name}</td><td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
    : null
)

export default Users