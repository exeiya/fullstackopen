import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object,
    loggedUser: PropTypes.string.isRequired
  }

  like = async () => {
    const blog = this.props.blog
    try {
      const userId = blog.user ? blog.user._id : null
      const likedBlog = { ...blog, user: userId, likes: blog.likes + 1 }
      await this.props.likeBlog(likedBlog)
      this.props.notify(`Liked blog ${blog.title} by ${blog.author}`, false)
    } catch (e) {
      console.log(e)
      this.props.notify('Blog could not be liked', true)
    }
  }

  delete = async () => {
    const blog = this.props.blog
    try {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
        await this.props.deleteBlog(blog.id)
        return this.props.notify(`Deleted blog ${blog.title} by ${blog.author}`, false)
      }
    } catch (e) {
      console.log(e)
      this.props.notify(`Blog ${blog.title} by ${blog.author} could not be deleted`, true)
    }
  }

  render() {
    const deleteButton = () => {
      if (user === null || this.props.loggedUser === user.username ) {
        return <button onClick={this.delete}>delete</button>
      }
      return null
    }

    if (!this.props.blog) return null

    const { title, author, url, likes, user } = this.props.blog

    return (
      <div className='content'>
        <h2>{title} by {author}</h2>
        <div style={{ marginLeft: '5px', marginTop: '5px' }}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <br />
          {likes} likes <button onClick={this.like}>like</button><br />
          added by {user ? user.name : '[user deleted]'} <br/>
          {deleteButton()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const blog = state.blogs.find(b => b.id === props.id)
  return {
    blog,
    loggedUser: state.loggedUser.name
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, deleteBlog, notify }
)(Blog)