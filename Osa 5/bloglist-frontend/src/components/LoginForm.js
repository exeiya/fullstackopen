import React from 'react'

const LoginForm = ({ handleLogin, handleFormChange, username, password }) => (
  <form onSubmit={ handleLogin }>
            <div>
              username <input type="text" name="username" value={username} onChange={handleFormChange} />
            </div>
            <div>
              password <input type="password" name="password" value={password} onChange={handleFormChange} />
            </div>
            <button type="submit">login</button>
  </form>
)

export default LoginForm