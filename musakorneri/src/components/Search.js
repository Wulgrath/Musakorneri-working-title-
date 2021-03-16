import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { initSearch } from '../reducers/searchReducer'
import { Table } from 'react-bootstrap'


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
      <Form action='/' method='get'>
        <Form.Label htmlFor='header-search'>
          <span className='visually-hidden'>Search</span>
        </Form.Label>
        <Form.Control
          type="text"
          id="header-search"
          placeholder="Type here to search..."
          name="search"
          onChange={handleChange}
          maxLength="50"
        />
      </Form>
      <Table striped>
        <tbody>
          <tr>
            <td><h4>Artists</h4></td>
          </tr>
          {filteredArtists.map(artist =>
            <tr key={artist.id}>
              <td>
                <Link to={`/artists/${artist.id}`}>
                  {artist.name}
                </Link>
              </td>
            </tr>)}
        </tbody>
        <tbody>
          <tr>
            <td><h4>Albums</h4></td>
          </tr>
          {filteredAlbums.map(album =>
            <tr key={album.id}>
              <td>
                <Link to={`/albums/${album.id}`}>
                  {album.title}
                </Link>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Search