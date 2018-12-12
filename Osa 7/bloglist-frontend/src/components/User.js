import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog._id}>{blog.title} by {blog.author}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const user = state.users.find(u => u.id === props.id)
  return {
    user
  }
}

export default connect(
  mapStateToProps
)(User)