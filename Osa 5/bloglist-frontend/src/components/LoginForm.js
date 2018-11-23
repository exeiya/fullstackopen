import React from 'react'

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

export default LoginForm