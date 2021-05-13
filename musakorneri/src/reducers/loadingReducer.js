export const setLoading = (loading) => {
  const current = loading
  return dispatch => {
    dispatch({
      type: 'SET_LOADING',
      data: current
    })
  }
}

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.data
    default: return state
  } 
}

export default loadingReducer