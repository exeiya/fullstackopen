import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (user) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(user)
    blogService.setToken(loggedUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    dispatch({
      type: 'LOGIN',
      data: loggedUser
    })
    dispatch(notify(`${loggedUser.name} logged in!`, false))
  }
}

export const logout = () => (dispatch) => {
  window.localStorage.clear()
  dispatch({
    type: 'LOGOUT'
  })
}

export const setLoggedUser = () => (dispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser) {
    blogService.setToken(JSON.parse(loggedUser).token)
    dispatch({
      type: 'LOGIN',
      data: JSON.parse(loggedUser)
    })
  }
}

export default loginReducer