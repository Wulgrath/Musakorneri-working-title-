import reviewService from '../services/reviews'

export const addReview = content => {
  return async dispatch => {
    const newReview = await reviewService.create(content)
    dispatch({
      type: 'NEW_REVIEW',
      data: newReview
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

export const initAlbumReviews = (id) => {
  return async dispatch => {
    const albumReviews = await reviewService.getAlbumReviews(id)
    dispatch({
      type: 'INIT_ALBUMREVIEWS',
      data: albumReviews
    })
  }
}

const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ALL_REVIEWS':
      return action.data
    case 'INIT_ALBUMREVIEWS':
      return action.data
    case 'NEW_REVIEW':
      return [...state, action.data]
      default: return state
  }
}

export default reviewReducer