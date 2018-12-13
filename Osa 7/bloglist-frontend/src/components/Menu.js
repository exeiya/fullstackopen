import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Menu = ({ loggedUser, logout }) => {
  const menuStyle = {
    paddingBottom: '5px'
  }

  return (
    <div style={menuStyle}>
      <Link to='/'>Blogs</Link>&nbsp;
      <Link to='/users'>Users</Link>&nbsp;
      <i>{loggedUser.name} logged in</i> <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default connect(
  (state) => ({ loggedUser: state.loggedUser }),
  { logout }
)(Menu)