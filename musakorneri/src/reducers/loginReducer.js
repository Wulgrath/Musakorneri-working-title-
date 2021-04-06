import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import { setErrorNotification } from './errorNotificationReducer'
import albumService from '../services/albums'
import reviewService from '../services/reviews'
import { history } from '../components/Navigation'

export const loggedIn = (user) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_LOGIN',
      data: user
    })
  }
}

export const login = (content) => {
  return async dispatch => {
    try {
      const user = await loginService.login(content)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN',
        data: user
      })
      albumService.setToken(user.token)
      reviewService.setToken(user.token)
      dispatch(setNotification(`Successfully logged in as ${user.username}`, 5))
      history.push('/')
    } catch (exception) {
      dispatch(setErrorNotification('Invalid username or password', 5))
    }
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'INIT_LOGIN':
      return action.data
      default: return state
  }
}

export default loginReducer