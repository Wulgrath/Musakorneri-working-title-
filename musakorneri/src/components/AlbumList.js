import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums } from '../reducers/albumReducer'
import { addReview } from '../reducers/reviewReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'

const AlbumList = () => {

  /*const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAlbums())
  }, [dispatch])*/

  const albums = useSelector(state => state.albums)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <h3>Album title</h3>
              </TableCell>
              <TableCell>
                <h3>Avg rating</h3>
              </TableCell>
              <TableCell>
                <h3>Artist</h3>
              </TableCell>
            </TableRow>
            {albums.map(album =>
              <TableRow key={album.id}>
                <TableCell>
                  <Link to={`/albums/${album.id}`}>
                    {album.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {Math.round((album.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / album.reviews.map(review => review.rating).length + Number.EPSILON) * 100) / 100}
                </TableCell>
                <TableCell>
                  <Link to={`/artists/${album.artistID.id}`}>
                    {album.artist}
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}


export default AlbumList