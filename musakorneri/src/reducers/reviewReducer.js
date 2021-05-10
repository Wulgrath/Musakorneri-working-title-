import reviewService from '../services/reviews'
import { setNotification } from './notificationReducer'
import { setErrorNotification } from './errorNotificationReducer'
import { updateNewReview } from './albumReducer'
import { updateExistingReview } from './albumReducer'
import { removeReviewFromAlbum } from './albumReducer'

export const addReview = review => {
  return async dispatch => {
    try {
      const newReview = await reviewService.create(review)
      dispatch({
        type: 'NEW_REVIEW',
        data:  { newReview, additionalData: review}
      })
      dispatch(updateNewReview(newReview))
      dispatch(setNotification('Review successfully added', 5))
    } catch (exception) {
      dispatch(setErrorNotification('Error sending review', 5))
    }
  }
}

export const addReviewFromNewAlbum = (review, additionalData) => {
  const newReview = review
  return dispatch => {
    dispatch({
      type: 'ADD_REVIEW_FROM_NEW_ALBUM',
      data: { newReview, additionalData }
    })
  }
}

export const initReviews = () => {
  return async dispatch => {
    const reviews = await reviewService.getAll()
    dispatch({
      type: 'INIT_ALL_REVIEWS',
      data: reviews
    })
  }
}

export const updateReview = (id, content) => {
  const newReview = {
    ...content
  }
  return async dispatch => {
    try {
      await reviewService.update(id, newReview)
      dispatch({
        type: 'UPDATE',
        data: { id, newReview }
      })
      dispatch(setNotification('Review updated', 5))
      dispatch(updateExistingReview(id, newReview))
    } catch (exception) {
      dispatch(setErrorNotification('Error occured', 5))
    }
  }
}

export const deleteReview = (album, review) => {
  return async dispatch => {
    await reviewService.remove(review.id)
    dispatch({
      type: 'DELETE',
      data: review.id
    })
    dispatch(removeReviewFromAlbum(album, review))
  }
}

const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ALL_REVIEWS':
      return action.data
    case 'NEW_REVIEW':
      const newReview = action.data.newReview
      const modifiedReview = {...newReview, 
        album: { 
          id: newReview.album, 
          title: action.data.additionalData.album_name,
          artist: action.data.additionalData.artist_name,
          artistID: action.data.additionalData.artistID
          },
        user: {
          id: newReview.user,
          username: action.data.additionalData.user_name
        }}
      return [...state, modifiedReview]
    case 'ADD_REVIEW_FROM_NEW_ALBUM':
      const reviewToNewAlbum = action.data.newReview
      const modifiedNewReview = {...reviewToNewAlbum,
        album: {
          id: reviewToNewAlbum.album,
          title: action.data.additionalData.album_name,
          artist: action.data.additionalData.artist_name,
          artistID: action.data.additionalData.artistID
        },
        user: {
          id: reviewToNewAlbum.userID,
          username: action.data.additionalData.user_name
        }
      }
      return [...state, modifiedNewReview]
    case 'UPDATE':
      const id = action.data.id
      const reviewToUpdate = state.find(n => n.id === id)
      const updatedReview = {
        ...reviewToUpdate, rating: action.data.newReview.rating, review: action.data.newReview.review
      }
      return state.map(review =>
        review.id !== id ? review : updatedReview
      )
    case 'DELETE':
      return state.filter(n => n.id !== action.data)
    default: return state
  }
}

export default reviewReducer