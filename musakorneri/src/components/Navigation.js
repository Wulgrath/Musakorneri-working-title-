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
import { Button, AppBar, Toolbar } from '@material-ui/core'
import Notification from './Notification'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';



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
            <p>Logged in as <b>{loggedUser.username}</b> <Button variant="contained" onClick={() => logOut()} className='logOut'>Log out</Button></p>
          </div>
          : null} </div>

        <Router basename='/' history={history}>
          <AppBar position="static" className='navigation' color='secondary'>
            <Toolbar>
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
                Add
            </Button>
              <Button color="inherit" component={Link} to='/search'>
                <SearchIcon />
            </Button>
            </Toolbar>
          </AppBar>

          {loggedUser ?
            null :
            <div>
              <Link to='/register'><Button className="btn btn-outline-info">Create account</Button></Link>
              <Link to='/login'><Button className="btn btn-outline-info">Log in</Button></Link>
            </div>}
          <Notification />
          <div className='view'>
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
          </div>
        </Router>
    </div>
  )
}


export default Navigation