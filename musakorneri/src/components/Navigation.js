import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { useSelector } from 'react-redux'
import AlbumList from './AlbumList'
import ArtistList from './ArtistList'
import NewAlbumForm from './NewAlbumForm'
import Album from './Album'
import Artist from './Artist'
import Home from './Home'
import CreateUser from './CreateUser'
import LoginForm from './LoginForm'
import Search from './Search'
import { Button, AppBar, IconButton, Toolbar } from '@material-ui/core'

export const history = createBrowserHistory()

const Navigation = () => {

  const loggedUser = useSelector(state => state.loggedUser)


  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <div> {loggedUser ?
        <div>
          <p>Logged in as <b>{loggedUser.username}</b> <Button variant="contained" onClick={() => logOut()}>Log out</Button></p>
        </div>
        : null} </div>

      <Router basename='/' history={history}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color="inherit" component={Link} to='/'>
              Home
              </Button>
            <Button color="inherit" component={Link} to='/albums'>
              Albums
            </Button>
            <Button color="inherit" component={Link} to='/artists'>
              Artists
            </Button>
            <Button color="inherit" component={Link} to='/rate'>
              Add album
            </Button>
            <Button color="inherit" component={Link} to='/search'>
              Search
            </Button>
          </Toolbar>
        </AppBar>

        {loggedUser ?
          null :
          <div>
            <Link to='/register'><Button className="btn btn-outline-info">Create account</Button></Link>
            <Link to='/login'><Button className="btn btn-outline-info">Log in</Button></Link>
          </div>}
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
          <Route path='/search'>
            <Search />
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