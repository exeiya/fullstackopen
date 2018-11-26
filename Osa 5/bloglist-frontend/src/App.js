import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
    blogService.getAll().then(blogs => {
      // sort blogs when the page is loaded - sorting on every like makes the UI elements constantly jump around resulting in bad UI experience
      blogs = blogs.sort((a, b) => b.likes - a.likes) 
      this.setState({ blogs })
    })

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
      this.blogForm.toggleVisibility()
    } catch (e) {
      console.log(e)
      this.showNotificationWithTimeout('A new blog could not be created', 'error')
    }
  }

  likeBlog = (id) => async () => {
    try {
      const blog = this.state.blogs.find(b => b.id === id)
      const userId = blog.user ? blog.user._id : null
      const updatedBlog = await blogService.update(id, { ...blog, user: userId, likes: blog.likes + 1 })
      this.setState({
        blogs: this.state.blogs.map(b => b.id !== blog.id ? b : {...updatedBlog, user: blog.user })
      })
    } catch (e) {
      console.log(e)
    }
  }

  deleteBlog = (id) => async () => {
    const blog = this.state.blogs.find(b => b.id === id)
    try {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteId(id)
        this.setState({ blogs: this.state.blogs.filter(b => b.id !== id) })
        return this.showNotificationWithTimeout(`Deleted blog ${blog.title} by ${blog.author}`, 'success')
      }
    } catch (e) {
      console.log(e)
      this.showNotificationWithTimeout(`Blog ${blog.title} by ${blog.author} could not be deleted`, 'error')
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
          <Notification notification={this.state.notification} />
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
        <Notification notification={this.state.notification} />
        <p>
          {this.state.user.name} logged in <button onClick={this.handleLogout}>Logout</button>
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
        {this.state.blogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
            like={this.likeBlog(blog.id)}
            delete={this.deleteBlog(blog.id)}
            loggedUser={this.state.user.username}
          />
        )}
      </div>
    );
  }
}

export default App;