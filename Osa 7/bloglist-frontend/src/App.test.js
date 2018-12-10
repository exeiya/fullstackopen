import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'


describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders only login form', () => {
      app.update()
      const blogComponents = app.find(Blog)
      const loginFormComponent = app.find(LoginForm)
      expect(blogComponents.length).toEqual(0)
      expect(loginFormComponent.length).toEqual(1)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      const loginFormComponent = app.find(LoginForm)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
      expect(loginFormComponent.length).toEqual(0)

    })
  })

})