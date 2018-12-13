import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      show: null
    }
  }

  toggleVisibility = () => {
    this.setState({ show: !this.state.show })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      await this.props.createBlog(addedBlog)
      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.notify(`A new blog ${addedBlog.title} by ${addedBlog.author} added`, false)
      this.toggleVisibility()
    } catch (e) {
      console.log(e)
      this.props.notify('A new blog could not be created', true)
    }
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  render() {
    const formStyle = {
      paddingBottom: '5px'
    }

    if (!this.state.show) {
      return (
        <div style={formStyle}>
          <button onClick={this.toggleVisibility}>Create a new blog</button>
        </div>
      )
    }

    return (
      <div style={formStyle}>
        <h3>Create new blog entry</h3>
        <form onSubmit={ this.handleSubmit }>
          <div>
            Title <input type="text" name="title" value={this.state.title} onChange={this.handleFormChange} />
          </div>
          <div>
            Author <input type="text" name="author" value={this.state.author} onChange={this.handleFormChange} />
          </div>
          <div>
            Url <input type="text" name="url" value={this.state.url} onChange={this.handleFormChange} />
          </div>
          <button type="submit">Create</button>
        </form>
        <button onClick={this.toggleVisibility}>Cancel</button>
      </div>
    )
  }
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(
  null,
  { createBlog, notify }
)(BlogForm)