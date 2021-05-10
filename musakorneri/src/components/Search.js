import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { initSearch } from '../reducers/searchReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, Paper, TextField, MenuItem } from '@material-ui/core'

const Search = () => {

  const dispatch = useDispatch()
  const albums = useSelector(state => state.albums)
  const artists = useSelector(state => state.artists)
  const searchQuery = useSelector(state => state.search) || null
  //const { search } = window.location
  const history = useHistory()

  //const query = new URLSearchParams(search).get('search')

  const filterAlbums = (albums, query) => {
    return albums.filter(album => {
      const albumTitle = album.title.toLowerCase()
      return albumTitle.includes(query)
    })
  }

  const filterArtists = (artists, query) => {
    return artists.filter(artist => {
      const artistName = artist.name.toLowerCase()
      return artistName.includes(query)
    })
  }

  const handleChange = (event) => {
    const searchFilter = event.target.value
    dispatch(initSearch(searchFilter))
  }

  /*const onSubmit = (event) => {
    history.push(`?search=${searchQuery}`)
    event.preventDefault()
  }*/

  const filteredAlbums = filterAlbums(albums, searchQuery)
  const filteredArtists = filterArtists(artists, searchQuery)

  return (
    <div>
      <h2>Search database</h2>
      <form action='/' method='get'>
        <label htmlFor='header-search'>
          <span className='visually-hidden'>Search</span>
        </label>
        <div className='inputField'>
        <TextField
          type="text"
          id="header-search"
          placeholder="Type here to search..."
          name="search"
          onChange={handleChange}
          maxLength="50"
          variant="outlined"
        />
        </div>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><h4>Artists</h4></TableCell>
            </TableRow>
            {filteredArtists.map(artist =>
              <TableRow key={artist.id}>
                <TableCell>
                  <Link to={`/artists/${artist.id}`}>
                    {artist.name}
                  </Link>
                </TableCell>
              </TableRow>)}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell><h4>Albums</h4></TableCell>
            </TableRow>
            {filteredAlbums.map(album =>
              <TableRow key={album.id}>
                <TableCell>
                  <Link to={`/albums/${album.id}`}>
                    {album.title}
                  </Link>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Search