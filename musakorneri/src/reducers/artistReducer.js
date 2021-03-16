import artistService from '../services/artists'

export const initArtists = () => {
  return async dispatch => {
    const artists = await artistService.getAll()
    dispatch({
      type: 'INIT_ALL_ARTISTS',
      data: artists
    })
  }
}

const artistReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ALL_ARTISTS':
      return action.data
      default: return state
  }
}

export default artistReducer