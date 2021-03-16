import React, { useEffect } from 'react'
import './App.css';
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Search from './components/Search'
import { loggedIn } from './reducers/loginReducer'
import albumService from './services/albums'
import reviewService from './services/reviews'
import { initAlbums } from './reducers/albumReducer'
import { initArtists } from './reducers/artistReducer'


const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initAlbums(), dispatch(initArtists()))
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
    <div className='container'>
      <div>
        <h1>Musakorneri</h1>
      </div>
      <Notification />
      <Navigation />
      <Footer />
    </div>
  )
}

export default App;
