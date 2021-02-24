import artistService from '../services/artists'

export const initArtists = () => {
  return async dispatch => {
    const artists = await artistService.getAll()
    dispatch({
      type: 'INIT',
      data: artists
    })
  }
}

const artistReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
      default: return state
  }
}

export default artistReducer