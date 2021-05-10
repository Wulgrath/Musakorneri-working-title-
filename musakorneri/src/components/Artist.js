import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initAlbums } from '../reducers/albumReducer'
import { initSingleArtist } from '../reducers/singleArtistReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Button, Paper } from '@material-ui/core'


const Artist = () => {

  const id = useParams().id


  const artists = useSelector(state => state.artists)
  const thisArtist = artists.find(n => n.id === id)

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
              {thisArtist.albums.map(album =>
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
                    {album.ratingAvg}
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