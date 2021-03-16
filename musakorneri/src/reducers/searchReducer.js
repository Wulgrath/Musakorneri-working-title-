
export const initSearch = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SET_SEARCH',
      data: content
    })
  }
}

const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.data.toLowerCase()
      default: return state
  }
}

export default searchReducer