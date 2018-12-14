import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap'

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
      <Form horizontal onSubmit={ this.handleLogin }>
        <FormGroup >
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={5}>
            <FormControl type="text" name="username" value={this.state.username} onChange={this.handleFormChange} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={5}>
            <FormControl type="password" name="password" value={this.state.password} onChange={this.handleFormChange} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={5}>
            <Button bsStyle="primary" type="submit">Login</Button>
          </Col>
        </FormGroup>
      </Form>
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