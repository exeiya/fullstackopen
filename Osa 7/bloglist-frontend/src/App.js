import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setLoggedUser, login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  async componentDidMount() {
    this.props.initializeBlogs()
    this.props.setLoggedUser()
    this.props.initializeUsers()
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
        <Router>
          <div>
            <h2>Blog App</h2>
            <Notification />
            <p>
              {this.props.user.name} logged in <button onClick={this.handleLogout}>Logout</button>
            </p>
            <Route exact path="/" render={() =>
              <div>
                <BlogForm />
                <BlogList />
              </div>
            } />
            <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
            <Route exact path="/users" render={() => <UserList /> } />
            <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
          </div>
        </Router>
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
  { notify, initializeBlogs, setLoggedUser, login, logout, initializeUsers }
)(App)