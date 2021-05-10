import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums, initArtists } from '../reducers/artistReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, TablePagination } from '@material-ui/core'
const ArtistList = () => {

  /*const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initArtists())
  }, [dispatch])*/

  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const artists = useSelector(state => state.artists)

  const alphabeticalArtists = artists.sort((a, b) => a.name_lowerCase.localeCompare(b.name_lowerCase))

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  

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
            {alphabeticalArtists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(artist =>
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
      <TablePagination 
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={alphabeticalArtists.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}


export default ArtistList