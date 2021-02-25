import loginService from '../services/login'

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
    } catch (exception) {
      console.log(exception)
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