import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          id={blog.id}
          loggedUser={user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.loggedUser
  }
}

export default connect(
  mapStateToProps
)(BlogList)