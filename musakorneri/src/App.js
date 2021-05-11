import React, { useEffect } from 'react'
import './App.css';
import { useDispatch } from 'react-redux'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import { loggedIn } from './reducers/loginReducer'
import albumService from './services/albums'
import reviewService from './services/reviews'
import { initAlbums } from './reducers/albumReducer'
import { initArtists } from './reducers/artistReducer'
import { initReviews } from './reducers/reviewReducer'
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6ebdd4' //light, metallic blue
      //previous green: '#11cb5f'
    },
    secondary: {
      main: '#383635', //grey
    },
    background: {
      default: '#f0f3f5'
    }
  }
})


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
    <Container className='container'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <div>
        <h1>Musakorneri</h1>
      </div>
      <Navigation />
        <Footer className='footer'/>
      </ThemeProvider>
    </Container>
  )
}

export default App;
