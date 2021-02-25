import albumService from '../services/albums'

export const initAlbums = () => {
  return async dispatch => {
    const albums = await albumService.getAll()
    dispatch({
      type: 'INIT_ALL',
      data: albums
    })
  }
}

export const addAlbum = content => {
  return async dispatch => {
    const newAlbum = await albumService.create(content)
    dispatch ({
      type: 'NEW',
      data: newAlbum
    })
  }
}

const albumReducer = (state = [], action) => {
  console.log(action)

  switch (action.type) {
    case 'INIT_ALL':
      return action.data
    case 'NEW':
      return [...state, action.data]
      default: return state
  }
}

export default albumReducer