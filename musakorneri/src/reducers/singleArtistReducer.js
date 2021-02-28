import artistService from '../services/artists'

export const initSingleArtist = (id) => {
  return async dispatch => {
    const artist= await artistService.getOne(id)
    dispatch({
      type: 'INIT_SINGLE_ARTIST',
      data: artist
    })
  }
}


const singleArtistReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SINGLE_ARTIST':
      return action.data
      default: return state
  }
}

export default singleArtistReducer