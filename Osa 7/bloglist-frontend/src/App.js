import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loginReducer'
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
        <h2>Blog App</h2>
        <Router>
          <div>
            <Menu />
            <Notification />
            <Switch>
              <Route exact path="/blogs/:id" render={({ match, history }) => <Blog id={match.params.id} history={history} />} />
              <Route exact path="/users" render={() => <UserList /> } />
              <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
              <Route exact path="/" render={() =>
                <div>
                  <h3>Blogs</h3>
                  <BlogForm />
                  <BlogList />
                </div>
              } />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
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
  { initializeBlogs, setLoggedUser, initializeUsers }
)(App)