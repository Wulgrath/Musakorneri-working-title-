import React, { useEffect } from 'react'
import './App.css';
import { useDispatch } from 'react-redux'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import { loggedIn } from './reducers/loginReducer'
import albumService from './services/albums'
import reviewService from './services/reviews'
import { initAlbums } from './reducers/albumReducer'
import { initArtists } from './reducers/artistReducer'
import { initReviews } from './reducers/reviewReducer'
import { Container, BottomNavigation } from '@material-ui/core'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAlbums(),
    dispatch(initArtists(),
    dispatch(initReviews())
    ))
  }, [dispatch])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
      albumService.setToken(user.token)
      reviewService.setToken(user.token)
    }
  })

  return (
    <Container>
      <div>
        <h1>Musakorneri</h1>
      </div>
      <Notification />
      <Navigation />
      <BottomNavigation>
        <Footer />
      </BottomNavigation>
    </Container>
  )
}

export default App;
