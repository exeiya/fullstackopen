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
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

class App extends React.Component {

  componentDidMount() {
    this.props.initializeBlogs()
    this.props.setLoggedUser()
    this.props.initializeUsers()
  }

  render() {
    if (!this.props.user) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
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
              {this.props.user.name} logged in <button onClick={() => this.props.logout()}>Logout</button>
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
  { initializeBlogs, setLoggedUser, logout, initializeUsers }
)(App)