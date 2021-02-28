import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AlbumList from './AlbumList'
import ArtistList from './ArtistList'
import NewAlbumForm from './NewAlbumForm'
import Album from './Album'
import Artist from './Artist'
import Home from './Home'
import CreateUser from './CreateUser'
import LoginForm from './LoginForm'



const Navigation = () => {

  const loggedUser = useSelector(state => state.loggedUser)


  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <div>
      <div> {loggedUser ? <p>Logged in as user '{loggedUser.username}'</p> : null} </div>
      
      <Router>
        <div>
          <Link to='/'><button className="btn btn-outline-info">Home</button></Link>
          <Link to='/albums'><button className="btn btn-outline-info">Albums</button></Link>
          <Link to='/artists'><button className="btn btn-outline-info">Artists</button></Link>
          <Link to='/rate'><button className="btn btn-outline-info">Add album</button></Link>
          <Link to='/register'><button className="btn btn-outline-info">Create account</button></Link>
          { loggedUser ? 
          <button className="btn btn-outline-info" onClick={() => logOut()}>Log out</button> : 
          <Link to='/login'><button className="btn btn-outline-info">Log in</button></Link>}
        </div>
        <Switch>
          <Route path='/albums/:id'>
            <Album />
          </Route>
          <Route path='/artists/:id'>
            <Artist />
          </Route>
          <Route path='/albums'>
            <AlbumList />
          </Route>
          <Route path='/artists'>
            <ArtistList />
          </Route>
          <Route path='/rate'>
            <NewAlbumForm />
          </Route>
          <Route path='/register'>
            <CreateUser />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default Navigation