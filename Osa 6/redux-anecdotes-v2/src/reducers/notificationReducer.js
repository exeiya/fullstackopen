const initialMsg = null

const notificationReducer = (state = initialMsg, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.msg
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    msg
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    msg: null
  }
}

export const notify = (msg, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      msg
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        msg: null
      })
    }, time)
  }
}

export default notificationReducer