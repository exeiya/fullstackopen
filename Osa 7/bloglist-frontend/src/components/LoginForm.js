import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleFormChange = (event) => {
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
    } catch (e) {
      console.log(e)
      this.setState({
        username: '',
        password: ''
      })
      this.props.notify('Wrong username or password', true)
    }
  }

  render() {
    return (
      <form onSubmit={ this.handleLogin }>
        <div>
          Username <input type="text" name="username" value={this.state.username} onChange={this.handleFormChange} />
        </div>
        <div>
          Password <input type="password" name="password" value={this.state.password} onChange={this.handleFormChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { login, notify }
)(LoginForm)