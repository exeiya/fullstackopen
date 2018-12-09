import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const menuStyle = {
    backgroundColor: '#d5ebf6',
    borderColor: '#247aa8',
    borderStyle: 'solid none solid none',
    borderWidth: '3px',
    padding: '10px',
    marginBottom: '10px'
  }

  const linkStyle = {
    textDecoration: 'none',
    color: '#247aa8',
    padding: '5px'
  }

  const activeLinkStyle = {
    backgroundColor: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={menuStyle}>    
      <NavLink exact to='/' style={linkStyle} activeStyle={activeLinkStyle}>anecdotes</NavLink>&nbsp;
      <NavLink to='/create' style={linkStyle} activeStyle={activeLinkStyle}>create new</NavLink>&nbsp;
      <NavLink to='/about' style={linkStyle} activeStyle={activeLinkStyle}>about</NavLink>&nbsp;
    </div>
  )
}

export default Menu