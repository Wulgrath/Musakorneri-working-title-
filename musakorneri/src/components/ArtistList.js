import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums, initArtists } from '../reducers/artistReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'
const ArtistList = () => {

  /*const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initArtists())
  }, [dispatch])*/

  const artists = useSelector(state => state.artists)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>Artist name</h3>
              </TableCell>
              <TableCell>
                <h3>Albums</h3>
              </TableCell>
            </TableRow>
            {artists.map(artist =>
              <TableRow key={artist.id}>
                <TableCell>
                  <Link to={`/artists/${artist.id}`}>
                    {artist.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {artist.albums.length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default ArtistList