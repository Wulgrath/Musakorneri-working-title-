import React, { useState } from 'react'
import { useField } from '../hooks'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addAlbum } from '../reducers/albumReducer'
import { TextField, Button, MenuItem } from '@material-ui/core'

const NewAlbumForm = () => {

  const dispatch = useDispatch()

  const title = useField('text')
  const artist = useField('text')
  const review = useField('text')
  const released = useField('text')
  const [rating, setRating] = useState("")
  const loggedUser = useSelector(state => state.loggedUser)

  const handleChange = event => {
    setRating(event.target.value);
  }

  const addRating = async (event) => {
    event.preventDefault()
    const content = {
      title: title.value,
      artist: artist.value,
      released: released.value,
      rating: rating,
      review: review.value,
      user_name: loggedUser.username,
      userID: loggedUser.id
    }
    dispatch(addAlbum(content))
  }

  const formTitle = { ...title }
  delete formTitle.reset
  const formArtist = { ...artist }
  delete formArtist.reset
  const formReview = { ...review }
  delete formReview.reset
  const formReleased = { ...released }
  delete formReleased.reset

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

  if (!loggedUser) {
    return (
      <div>
        <p>You must be logged in to add an album. <Link to={'/login'}>Login</Link> or <Link to='/register'>Create a new account</Link></p>
      </div>
    )
  }

  return (
    <div>
      <h2>Add a new album</h2>
      <form onSubmit={addRating}>
        <div>
          <div className='inputField'>
            <TextField {...formTitle} required inputProps={{ maxLength: 50 }} label="Album title" variant="outlined" className='input' />
          </div>
          <div className='inputField'>
            <TextField {...formArtist} required inputProps={{ maxLength: 50 }} label="Artist" variant="outlined" className='input' />
          </div>
          <div className='inputField'>
            <TextField {...formReleased} required inputProps={{ maxLength: 4 }} label="Year released" variant="outlined" max={new Date().getFullYear() + 1} className='smallInput' />
          </div>
          <div className='inputField'>
            <TextField select label="Rating" required onChange={handleChange} value={rating} variant="outlined" className='smallInput'>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField {...formReview} rows={4} inputProps={{ maxLength: 200 }} label="Your review (optional)" multiline variant="outlined" fullWidth />
          </div>
          <div className='button'>
          <Button variant="contained" color="primary" type='submit' className='button'>Send</Button>
          </div>
        </div>
      </form>
    </div>
  )

}


export default NewAlbumForm