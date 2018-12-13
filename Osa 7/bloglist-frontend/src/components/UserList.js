import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)