import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

const Menu = ({ loggedUser, logout }) => {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Collapse>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem>blogs</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/users">
            <NavItem>users</NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Form pullRight>
          <Button onClick={() => logout()}>Logout</Button>
        </Navbar.Form>
        <Navbar.Text pullRight>
          <i>{loggedUser.name} logged in</i>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default connect(
  (state) => ({ loggedUser: state.loggedUser }),
  { logout }, null,
  { pure: false }
)(Menu)