import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <ListGroup>
      {blogs.map(blog =>
        <ListGroupItem key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes)
  }
}

export default connect(
  mapStateToProps
)(BlogList)