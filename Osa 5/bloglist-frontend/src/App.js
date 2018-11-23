import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      user: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      this.setState({ user: JSON.parse(loggedUser) })
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }

  handleLoginFormChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.showNotificationWithTimeout(`${user.name} logged in!`, 'success')
    } catch (e) {
      console.log(e)
      this.showNotificationWithTimeout('Wrong username or password', 'error')
    }
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.setState({ user: null })
    window.localStorage.clear()
  }
  
  handleBlogFromChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({ 
        blogs: this.state.blogs.concat(addedBlog),
        title: '',
        author: '',
        url: ''
      })
      this.showNotificationWithTimeout(`A new blog ${addedBlog.title} by ${addedBlog.author} added`, 'success')
    } catch (e) {
      console.log(e)
      this.showNotificationWithTimeout('A new blog could not be created', 'error')
    }
  }

  showNotificationWithTimeout = (msg, type) => {
    this.setState({
      notification: { msg, type }
    })
    setTimeout(() => {
      this.setState({ notification: null})
    }, 3000)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <LoginForm handleLogin={this.handleLogin} handleFormChange={this.handleLoginFormChange} username={this.state.username} password={this.state.password} />
        </div>
      )
    }

    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={this.state.notification} />
        <p>
          {this.state.user.name} logged in <button onClick={this.handleLogout}>Logout</button>
        </p>
        <h3>Create new blog entry</h3>
        <BlogForm handleCreate={this.createBlog} handleFormChange={this.handleBlogFromChange} title={this.state.title} author={this.state.author} url={this.state.url} />
        <br />
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;