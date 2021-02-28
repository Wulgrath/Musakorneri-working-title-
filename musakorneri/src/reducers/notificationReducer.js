let timer = 0

export const setNotification = (notification, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: notification
    })
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: ''
      })
    }, timeOut * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return action.data
      default: return state
  }
}

export default notificationReducer