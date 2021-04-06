import React, { useState } from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addAlbum } from '../reducers/albumReducer'


const NewAlbumForm = () => {

  const dispatch = useDispatch()

  const title = useField('text')
  const artist = useField('text')
  const review = useField('text')
  const released = useField('text')
  const [rating, setRating] = useState(Number)
  const loggedUser = useSelector(state => state.loggedUser)

  const handleChange = event => {
    setRating(event.value);
  }

  const addRating = async (event) => {
    event.preventDefault()
    const content = {
      title: title.value,
      artist: artist.value,
      released: released.value,
      rating: rating,
      review: review.value
    }
    dispatch(addAlbum(content))
  }

  const formTitle = { ...title }
  delete formTitle.reset
  const formArtist = { ...artist }
  delete formArtist.reset
  const formReview = {...review}
  delete formReview.reset
  const formReleased = {...released}
  delete formReleased.reset

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

  if (!loggedUser) {
    return (
      <div>
        <p>You must be logged in to add an album. <Link to ={'/login'}>Login</Link> or <Link to='/register'>Create a new account</Link></p>
      </div>
    )
  }

  return (
    <div>
      <Form onSubmit={addRating}>
        <Form.Group>
          <Form.Label>
            Album title:
          </Form.Label>
          <Form.Control {...formTitle} required maxLength='50'/>
          <Form.Label>
            Artist:
          </Form.Label>
          <Form.Control {...formArtist} required maxLength='50'/>
          <Form.Label>
            Year released:
          </Form.Label>
          <Form.Control {...formReleased} required maxLength='4' max={new Date().getFullYear() + 1}/>
          <Form.Label>
            Your rating:
          </Form.Label>
          <Select options={options} onChange={handleChange} />
          <Form.Label>
            Your review (optional):
          </Form.Label>
          <Form.Control {...formReview} as='textarea' rows={3} name='review' maxLength='300'/>
          <Button type='submit'>Send</Button>
        </Form.Group>
      </Form>
    </div>
  )

}


export default NewAlbumForm