import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useField } from '../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { addReview, initReviews, updateReview, deleteReview } from '../reducers/reviewReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, TextField, MenuItem, Grid } from '@material-ui/core'

const Album = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const review = useField('text')

  const albums = useSelector(state => state.albums)
  const user = useSelector(state => state.loggedUser)
  const thisAlbum = albums.find(n => n.id === id)

  const [rating, setRating] = useState("")

  const handleChange = event => {
    setRating(event.target.value);
  }

  //Arvostelun lähetys
  const sendReview = async (event) => {
    event.preventDefault()

    const existingReview = thisAlbum.reviews.find(review => review.user === user.id)

    const content = {
      albumID: thisAlbum.id,
      rating: rating,
      review: review.value,
      album_name: thisAlbum.title,
      artist_name: thisAlbum.artist,
      artistID: thisAlbum.artistID.id,
      user_name: user.username
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
  const removeReview = (album, review) => {
    const deleteWarning = window.confirm(`Remove your review?`)
    if (deleteWarning) {
      dispatch(deleteReview(album, review))
    }
  }

  const formReview = { ...review }
  delete formReview.reset

  const options = [
    { value: 0.5, label: '0.5 - Trash' },
    { value: 1, label: '1.0 - Awful' },
    { value: 1.5, label: '1.5 - Very Poor' },
    { value: 2, label: '2.0 - Poor' },
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
          <div>by <Link to={`/artists/${thisAlbum.artistID.id || thisAlbum.artistID}`}>
            {thisAlbum.artist}
          </Link>
          </div></h1>
        <h2> Average Rating: {thisAlbum.ratingAvg}</h2>
        { user ? <form onSubmit={sendReview}>
          <div>
            <div className='inputField'>
              <TextField select label="Rating" required onChange={handleChange} value={rating} variant="outlined" helperText="Select your rating">
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className='inputField'>
              <TextField {...formReview} rows={4} inputProps={{ maxLength: 200}} label="Your review (optional)" multiline variant="outlined" fullWidth/>
            </div>
            <Button variant="contained" color="primary" type='submit'>Send</Button>
          </div>
        </form> : <p>You must be logged in to add a review. <Link to={'/login'}>Login</Link> or <Link to='/register'>Create a new account</Link></p>}
        <h2>Reviews</h2>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer className='customPaper'>
              <Table className="table">
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
                  </TableRow>
                  {thisAlbum.reviews.map(review =>
                    <TableRow key={review.id || review}>
                      <TableCell>
                      {user ?
                          user.id === review.user ?
                            <button className='deleteButton' onClick={() => removeReview(thisAlbum.id, review)}>X</button> : null
                          : null}
                        {review.rating} 
                      </TableCell>
                      <TableCell className="tableCell" style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                        {review.review}
                      </TableCell>
                      <TableCell>
                        {review.user_name}
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
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