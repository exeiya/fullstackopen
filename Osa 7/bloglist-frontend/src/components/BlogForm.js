import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

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
          <Button bsStyle='primary' onClick={this.toggleVisibility}>Create a new blog</Button>
        </div>
      )
    }

    return (
      <div style={formStyle}>
        <h3>Create new blog entry</h3>
        <Form horizontal onSubmit={ this.handleSubmit }>
          <FormGroup >
            <Col componentClass={ControlLabel} sm={1}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl type="text" name="title" value={this.state.title} onChange={this.handleFormChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={1}>
              Author
            </Col>
            <Col sm={6}>
              <FormControl type="text" name="author" value={this.state.author} onChange={this.handleFormChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={1}>
              Url
            </Col>
            <Col sm={6}>
              <FormControl type="text" name="url" value={this.state.url} onChange={this.handleFormChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={1}>
              <Button bsStyle="success" type="submit">Create</Button>
            </Col>
            <Col sm={1}>
              <Button bsStyle='warning' onClick={this.toggleVisibility}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
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