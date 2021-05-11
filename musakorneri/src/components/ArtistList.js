import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
const ArtistList = () => {

  /*const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initArtists())
  }, [dispatch])*/

  
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const artists = useSelector(state => state.artists)

  const alphabeticalArtists = artists.sort((a, b) => a.name_lowerCase.localeCompare(b.name_lowerCase))

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  
  const indexOfLast = page * rowsPerPage
  const indexOfFirst = indexOfLast - rowsPerPage

  return (
    <div>
      <TableContainer className='customPaper'>
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
            {alphabeticalArtists.slice(indexOfFirst, indexOfLast)
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
      <div className='pagination'>
      <Pagination 
        count={Math.ceil(alphabeticalArtists.length / rowsPerPage)}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        onChange={handleChangePage}
        variant='outlined'
        shape='rounded'
      />
      </div>
    </div>
  )
}


export default ArtistList