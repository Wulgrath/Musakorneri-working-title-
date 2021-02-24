import React from 'react'
import './App.css';
import LoginForm from './components/LoginForm'
import AlbumList from './components/AlbumList'
import Footer from './components/Footer'
import Navigation from './components/Navigation'

function App() {
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
