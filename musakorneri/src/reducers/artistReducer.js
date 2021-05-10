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

export const newArtist = (album) => {
  return dispatch => {
    dispatch({
      type: 'NEW_ARTIST',
      data: album
    })
  }
}

const artistReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ALL_ARTISTS':
      return action.data
    case 'NEW_ARTIST':
      const existingArtist = state.find(n => n.name_lowerCase === action.data.artist.toLowerCase())
      if (existingArtist) {
        const artistToUpdate = existingArtist
        const updatedArtist = {
          ...artistToUpdate, albums: artistToUpdate.albums.concat(action.data)
        }
        console.log(updatedArtist)
        return state.map(artist =>
          artist.id !== action.data.artistID ? artist : updatedArtist)
      } else {
        const newArtist = {
          albums: [action.data],
          name: action.data.artist,
          name_lowerCase: action.data.artist.toLowerCase(),
          id: action.data.artistID
        }
        return [...state, newArtist] 
      }
      default: return state
  }
}

export default artistReducer