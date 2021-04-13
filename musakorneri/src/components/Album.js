import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useField } from '../hooks'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { addReview, initReviews, updateReview, deleteReview } from '../reducers/reviewReducer'
import { initSingleAlbum } from '../reducers/singleAlbumReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, Paper, TextField, MenuItem } from '@material-ui/core'


const Album = () => {

  const id = useParams().id
  const dispatch = useDispatch()

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
  const [rating, setRating] = useState("")

  const handleChange = event => {
    setRating(event.target.value);
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

  /*
    <div>
    <Select options={options} onChange={handleChange} />
    </div>
  
    */
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
        <h1>{thisAlbum.title}
        <div>by {thisAlbum.artist}</div></h1>
        <h2> Average Rating: {roundedAverage}</h2>
        { user ? <form onSubmit={sendReview}>
          <div>
            <div>
              <TextField select label="Rating" required onChange={handleChange} value={rating} variant="outlined" helperText="Select your rating">
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField {...formReview} rows={4} maxLength='300' label="Your review (optional)" multiline variant="outlined" />
            </div>
            <Button variant="contained" color="primary" type='submit'>Send</Button>
          </div>
        </form> : <p>You must be logged in to add a review. <Link to={'/login'}>Login</Link> or <Link to='/register'>Create a new account</Link></p>}
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h3>Rating</h3>
                </TableCell>
                <TableCell>
                  <h3>Review</h3>
                </TableCell>
                <TableCell>
                  <h3>User</h3>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              {thisAlbumReviews.map(review =>
                <TableRow key={review.id}>
                  <TableCell>
                    {review.rating}
                  </TableCell>
                  <TableCell>
                    {review.review}
                  </TableCell>
                  <TableCell>
                    {review.user.username}
                  </TableCell>
                  <TableCell>
                    {user ?
                      user.username === review.user.username ?
                        <Button variant='contained' onClick={() => removeReview(review.id)}>X</Button> : null
                      : null}
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
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