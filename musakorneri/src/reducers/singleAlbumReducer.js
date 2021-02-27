import albumService from '../services/albums'

export const initSingleAlbum = (id) => {
  return async dispatch => {
    const album = await albumService.getOne(id)
    dispatch({
      type: 'INIT_SINGLE_ALBUM',
      data: album
    })
  }
}

const singleAlbumReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SINGLE_ALBUM':
      return action.data
      default: return state
  }
}

export default singleAlbumReducer
