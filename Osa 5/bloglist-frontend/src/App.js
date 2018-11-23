import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFormChange = (event) => {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('logging in...')
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
    } catch (e) {
      console.log(e)
      console.log('login failed')
    }
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
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;