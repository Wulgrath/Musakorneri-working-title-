import React, { useEffect } from 'react'
import './App.css';
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import { loggedIn } from './reducers/loginReducer'
import albumService from './services/albums'


const App = () => {

  const dispatch = useDispatch()
  
  /*useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
      albumService.setToken(user.token)
    }
  })

  return (
    <div className='container'>
      <div>
        <h1>Musakorneri</h1>
      </div>
      <LoginForm />
      <Navigation />
      <Footer />
    </div>
  )
}

export default App;
