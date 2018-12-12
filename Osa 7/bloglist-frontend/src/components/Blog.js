import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    loggedUser: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  expand = () => {
    this.setState({ expanded: !this.state.expanded })
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
    const { title, author, url, likes, user } = this.props.blog
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      paddingBottom: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const deleteButton = () => {
      if (user === null || this.props.loggedUser === user.username ) {
        return <button onClick={this.delete}>delete</button>
      }
      return null
    }

    if (!this.state.expanded) {
      return (
        <div className='content' style={blogStyle} onClick={this.expand}>
          {title} by {author}
        </div>
      )
    }

    return (
      <div className='content' style={blogStyle}>
        <div onClick={this.expand}>
          {title} by {author}
        </div>
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
    loggedUser: props.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { likeBlog, deleteBlog, notify }
)(Blog)