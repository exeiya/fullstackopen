import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleFormChange, username, password }) => (
  <form onSubmit={ handleLogin }>
    <div>
      Username <input type="text" name="username" value={username} onChange={handleFormChange} />
    </div>
    <div>
      Password <input type="password" name="password" value={password} onChange={handleFormChange} />
    </div>
    <button type="submit">Login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm