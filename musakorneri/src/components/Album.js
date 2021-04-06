import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useField } from '../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Table } from 'react-bootstrap'
import Select from 'react-select'
import { addReview, initReviews, updateReview, deleteReview } from '../reducers/reviewReducer'
import { initSingleAlbum } from '../reducers/singleAlbumReducer'


const Album = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initReviews())
  }, [dispatch])

  //yhden levyn tietojen haku
  /*useEffect(() => {
    dispatch(initSingleAlbum(id))
  }, [])*/

  const review = useField('text')

  const albums = useSelector(state => state.albums)
  const user = useSelector(state => state.loggedUser)
  const reviews = useSelector(state => state.reviews)
  //const thisAlbum = useSelector(state => state.singleAlbum)
  const thisAlbum = albums.find(n => n.id === id)

  const thisAlbumReviews = reviews.filter(n => n.album.id === id)
  const [rating, setRating] = useState(Number)

  const handleChange = event => {
    setRating(event.value);
  }

  //Arvostelun lähetys
  const sendReview = async (event) => {
    event.preventDefault()

    const existingReview = thisAlbumReviews.find(review => review.user.username === user.username)

    const content = {
      albumID: thisAlbum.id,
      rating: rating,
      review: review.value
    }
    if (existingReview) {
      const reviewWarning = window.confirm(`You have already rated this album. Do you wish to update your review?`)
      if (reviewWarning) {
        dispatch(updateReview(existingReview.id, content))
        review.reset()
      } else {
        console.log('review not updated')
      }
    } else {
      dispatch(addReview(content))
    }
  }

  //arvostelun poisto
  const removeReview = (id) => {
    const deleteWarning = window.confirm(`Remove your review?`)
    if (deleteWarning) {
      dispatch(deleteReview(id))
    }
  }

  const formReview = { ...review }
  delete formReview.reset

  const ratingSum = thisAlbumReviews.map(n => n.rating).reduce((a, b) => a + b, 0)
  const average = ratingSum / thisAlbumReviews.map(n => n.rating).length
  const roundedAverage = Math.round((average + Number.EPSILON) * 100) / 100

  const options = [
    { value: 0.5, label: '0.5 - Trash' },
    { value: 1, label: '1.0 - Awful' },
    { value: 1.5, label: '1.5 - Poor' },
    { value: 2, label: '2.0 - Very Poor' },
    { value: 2.5, label: '2.5 - Mediocre' },
    { value: 3, label: '3 - Good' },
    { value: 3.5, label: '3.5 - Great' },
    { value: 4, label: '4 - Excellent' },
    { value: 4.5, label: '4.5 - Superb' },
    { value: 5, label: '5 - A Classic' }
  ]

  if (thisAlbum) {
    return (
      <div>
        <h1>{thisAlbum.title} by {thisAlbum.artist}</h1>
        <h2> Average Rating: {roundedAverage}</h2>
        { user ? <Form onSubmit={sendReview}>
          <Form.Group>
            <Form.Label>
              Your rating:
          </Form.Label>
            <Select options={options} onChange={handleChange} />
            <Form.Label>
              Your review (optional):
          </Form.Label>
            <Form.Control {...formReview} as='textarea' rows={3} maxLength='300' />
            <Button type='submit'>Send</Button>
          </Form.Group>
        </Form> : <p>You must be logged in to add a review. <Link to ={'/login'}>Login</Link> or <Link to='/register'>Create a new account</Link></p>}
        <Table striped>
          <tbody>
            <tr>
              <td>
                <h4>Rating</h4>
              </td>
              <td>
                <h4>Review</h4>
              </td>
              <td>
                <h4>User</h4>
              </td>
              <td></td>
            </tr>
            {thisAlbumReviews.map(review =>
              <tr key={review.id}>
                <td>
                  {review.rating}
                </td>
                <td>
                  {review.review}
                </td>
                <td>
                  {review.user.username}
                </td>
                <td>
                  {user ?
                    user.username === review.user.username ?
                      <Button variant='secondary' onClick={() => removeReview(review.id)}>X</Button> : null
                    : null}
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    )
  } else {
    return (
      <div>
        <p>404: Not found</p>
      </div>
    )
  }

}



export default Album