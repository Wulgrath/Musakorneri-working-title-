import userService from '../services/userService'
import { setNotification } from './notificationReducer'
import { setErrorNotification } from './errorNotificationReducer'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

export const createUser = (content) => {
  return async dispatch => {
    try {
      const newUser = await userService.create(content)
      dispatch({
        type: 'NEW_USER',
        data: newUser
      })
      dispatch(setNotification('User created, you can now log in', 5))
    } catch (exception) {
      dispatch(setErrorNotification('Username already taken', 5))
    }
  }
}

const userReducer = (state = [], action) => {

  switch (action.type) {
    case 'INITUSERS':
      return action.data
    case 'NEW_USER':
      return [...state, action.data]
    default: return state
  }
}

export default userReducer