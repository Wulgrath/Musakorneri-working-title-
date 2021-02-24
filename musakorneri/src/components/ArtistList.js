import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums, initArtists } from '../reducers/artistReducer'
import { Table } from 'react-bootstrap'

const ArtistList = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initArtists())
  }, [dispatch])

  const artists = useSelector(state => state.artists)

  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <h4>Artist name</h4>
            </td>
            <td>
              <h4>Albums</h4>
            </td>
            <td>
              <h4>Average rating</h4>
            </td>
          </tr>
          {artists.map(artist =>
            <tr key={artist.id}>
              <td>
                <Link to={`/artists/${artist.id}`}>
                  {artist.name}
                </Link>
              </td>
              <td>
                <Link to={`/artists/`}>
                  
                </Link>
              </td>
              <td>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}


export default ArtistList