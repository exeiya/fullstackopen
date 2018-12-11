const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        msg: action.msg,
        error: action.error
      }
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (msg, error) => {
  return {
    type: 'SET_NOTIFICATION',
    msg,
    error
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const notify = (msg, error) => (dispatch) => {
  dispatch(setNotification(msg, error))
  setTimeout(() => {
    dispatch(removeNotification())
  }, 3000)
}

export default notificationReducer