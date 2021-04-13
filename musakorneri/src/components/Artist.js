import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initAlbums } from '../reducers/albumReducer'
import { initSingleArtist } from '../reducers/singleArtistReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, Paper } from '@material-ui/core'


const Artist = () => {

  const id = useParams().id

  //yhden artistin haku
  /*useEffect(() => {
    dispatch(initSingleArtist(id))
  }, [])*/


  const artists = useSelector(state => state.artists)
  const albums = useSelector(state => state.albums)
  //const thisArtist = useSelector(state => state.singleArtist)
  const thisArtist = artists.find(n => n.id === id)

  const thisArtistAlbums = albums.filter(n => n.artistID.id === id)

  if (thisArtist) {
    return (
      <div>
        <h1>
          {thisArtist.name}
        </h1>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><h3>Albums</h3></TableCell>
                <TableCell><h3>Released</h3></TableCell>
                <TableCell><h3>Avg rating</h3></TableCell>
              </TableRow>
              {thisArtistAlbums.map(album =>
                <TableRow key={album.id}>
                  <TableCell>
                    <Link to={`/albums/${album.id}`}>
                      {album.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {album.released}
                  </TableCell>
                  <TableCell>
                    {Math.round((album.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / album.reviews.map(review => review.rating).length + Number.EPSILON) * 100) / 100}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  } else {
    return (
      <div>
        404: Not Found.
      </div>
    )
  }


}


export default Artist