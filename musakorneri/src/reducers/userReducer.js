import userService from '../services/userService'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

export const createUser = content => {
  return async dispatch => {
    const newUser = await userService.create(content)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
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