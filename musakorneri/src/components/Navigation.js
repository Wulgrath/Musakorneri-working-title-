import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AlbumList from './AlbumList'
import ArtistList from './ArtistList'
import NewAlbumForm from './NewAlbumForm'
import Album from './Album'
import Artist from './Artist'
import Home from './Home'
import CreateUser from './CreateUser'
import { Button } from 'react-bootstrap'

const Navigation = () => {
  return (
    <div>
      <Router>
        <div>
          <Link to='/albums'><button className="btn btn-outline-info">Albums</button></Link>
          <Link to='/artists'><button className="btn btn-outline-info">Artists</button></Link>
          <Link to='/rate'><button className="btn btn-outline-info">Add album</button></Link>
          <Link to='/register'><button className="btn btn-outline-info">Create account</button></Link>
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
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default Navigation