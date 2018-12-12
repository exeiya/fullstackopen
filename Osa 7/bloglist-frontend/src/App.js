import React from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setLoggedUser, login, logout } from './reducers/loginReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: ''
    }
  }

  async componentDidMount() {
    this.props.initializeBlogs()
    this.props.setLoggedUser()
  }

  handleLoginFormChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = {
        username: this.state.username,
        password: this.state.password
      }
      await this.props.login(user)
      this.setState({ username: '', password: '' })
      this.props.notify(`${this.props.user.name} logged in!`, false)
    } catch (e) {
      console.log(e)
      this.props.notify('Wrong username or password', true)
    }
  }

  handleLogout = () => {
    this.props.logout()
  }

  handleBlogFromChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  createBlog = async (event) => {
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
      this.blogForm.toggleVisibility()
    } catch (e) {
      console.log(e)
      this.props.notify('A new blog could not be created', true)
    }
  }

  render() {
    if (this.props.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={this.handleLogin}
            handleFormChange={this.handleLoginFormChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {this.props.user.name} logged in <button onClick={this.handleLogout}>Logout</button>
        </p>
        <h3>Create new blog entry</h3>
        <Togglable buttonLabel='Create a new blog' ref={ component => this.blogForm = component }>
          <BlogForm
            handleCreate={this.createBlog}
            handleFormChange={this.handleBlogFromChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
          />
        </Togglable>
        <br />
        <BlogList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { notify, initializeBlogs, createBlog, setLoggedUser, login, logout }
)(App)