import albumService from '../services/albums'
import { setNotification } from './notificationReducer'
import { setErrorNotification } from './errorNotificationReducer'
import { newArtist } from './artistReducer' 
import { addReviewFromNewAlbum } from './reviewReducer'
import { setLoading } from './loadingReducer'


export const initAlbums = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    const albums = await albumService.getAll()
    dispatch({
      type: 'INIT_ALL_ALBUMS',
      data: albums
    })
    dispatch(setLoading(false))
  }
}

export const addAlbum = content => {
  return async dispatch => {
    try {
      dispatch(setLoading(true))
      const resData = await albumService.create(content)
      const newAlbum = resData.savedAlbum
      const newReview = resData.savedReview
      
      const additionalData = {
        album_name: newAlbum.title,
        artist_name: newAlbum.artist,
        artistID: newAlbum.artistID,
        user_name: content.user_name,
      }
      
      dispatch({
        type: 'NEW_ALBUM',
        data: {newAlbum, newReview}
      })
      dispatch(setLoading(false))
      dispatch(setNotification(`Successfully added new album '${newAlbum.title}'`, 5))
      dispatch(newArtist(newAlbum))
      dispatch(addReviewFromNewAlbum(newReview, additionalData))
    } catch (exception) {
      dispatch(setErrorNotification('Unable to add album, check if it already exists', 5))
    }
  }
}
 
// Lisätään uusi arvostelu albumin tilaan
export const updateNewReview = (review) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_NEW_REVIEW',
      data: review
    })
  }
}

export const updateExistingReview = (id, review) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_EXISTING_REVIEW',
      data: { id, review }
    })
  }
}

//Poistettu arvostelu poistetaan myös albumin tilasta
export const removeReviewFromAlbum = (album, review) => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_REVIEW',
      data: { album_id: album, id: review.id, review }
    })
  }
}


const albumReducer = (state = [], action) => {

  const calculateAverage = (reviews) => {
    const average = Math.round((reviews.map(n => n.rating).reduce((a, b) => a + b, 0) / reviews.map(n => n.rating).length + Number.EPSILON) * 100) / 100
    return average
  }

  switch (action.type) {
    case 'INIT_ALL_ALBUMS':
      return action.data
    case 'NEW_ALBUM':
      const addedAlbum = action.data.newAlbum

      const newModifiedAlbum = {...addedAlbum, reviews: [
        {
          user: action.data.newReview.user,
          user_name: action.data.newReview.user_name,
          rating: action.data.newReview.rating,
          review: action.data.newReview.review,
          id: addedAlbum.reviews[0]
        }
      ]}
      return [...state, newModifiedAlbum]
    case 'UPDATE_NEW_REVIEW':
      const albumToUpdate = state.find(n => n.id === action.data.album)
      const updatedAlbum = {
        ...albumToUpdate, reviews: albumToUpdate.reviews.concat(action.data)
      }
      
      const averagedAlbum = {
        ...updatedAlbum, ratingAvg: calculateAverage(updatedAlbum.reviews) 
      }
      return state.map(album =>
        album.id !== action.data.album ? album : averagedAlbum)
    case 'UPDATE_EXISTING_REVIEW':
      const album = state.find(n => n.id === action.data.review.albumID)
      const reviewToUpdate = album.reviews.find(n => n.id === action.data.id)
      const updatedReview = {
        ...reviewToUpdate, 
        rating: action.data.review.rating,
        review: action.data.review.review,
      }
      const newReviews = album.reviews.map(review => 
        review.id !== action.data.id ? review : updatedReview)
      
      const newAlbum = {
        ...album, reviews: newReviews, ratingAvg: calculateAverage(newReviews)
      }
      return state.map(album =>
        album.id !== action.data.review.albumID ? album : newAlbum )
    case 'REMOVE_REVIEW':
      const albumToModify = state.find(n => n.id === action.data.album_id)
      const modifiedReviews = albumToModify.reviews.filter(n => n.id !== action.data.id)
      const modifiedAlbum = {...albumToModify, reviews: modifiedReviews, ratingAvg: calculateAverage(modifiedReviews) || 0}
      return state.map(album =>
        album.id !== action.data.album_id ? album : modifiedAlbum)
    default: return state
  }
}

export default albumReducer