import albumService from '../services/albums'
import { setNotification } from './notificationReducer'
import { setErrorNotification } from './errorNotificationReducer'
import { initArtists } from './artistReducer'



export const initAlbums = () => {
  return async dispatch => {
    const albums = await albumService.getAll()
    dispatch({
      type: 'INIT_ALL_ALBUMS',
      data: albums
    })
  }
}

export const addAlbum = content => {
  return async dispatch => {
    try {
      const newAlbum = await albumService.create(content)
      dispatch({
        type: 'NEW_ALBUM',
        data: newAlbum
      })
      dispatch(setNotification(`Successfully added new album '${newAlbum.title}'`, 5))
      dispatch(initArtists())
    } catch (exception) {
      dispatch(setErrorNotification('Unable to add album, check if it already exists', 5))
    }
  }
}

const albumReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_ALL_ALBUMS':
      return action.data
    case 'INIT_ONE_ALBUM':
      return action.data
    case 'NEW_ALBUM':
      return [...state, action.data]
    default: return state
  }
}

export default albumReducer