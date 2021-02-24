import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AlbumList from './AlbumList'
import ArtistList from './ArtistList'
import NewAlbumForm from './NewAlbumForm'

const Navigation = () => {
  return (
    <div>
      <Router>
        <div>
        <Link to='/albums'><button className="btn btn-outline-info">Albums</button></Link>
        <Link to='/artists'><button className="btn btn-outline-info">Artists</button></Link>
        <Link to='/rate'><button className="btn btn-outline-info">Add album</button></Link>
        </div>
        <Switch>
          <Route path='/albums'>
            <AlbumList />
          </Route>
          <Route path='/artists'>
            <ArtistList />
          </Route>
          <Route path='/rate'>
            <NewAlbumForm />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}


export default Navigation