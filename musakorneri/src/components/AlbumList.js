import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, Grid, TextField, MenuItem } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import * as _ from 'lodash'

const AlbumList = () => {

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  //const [sliderValue, setSliderValue] = useState([0, 2021])
  const [sortMethod, setSortMethod] = useState('title')
  const [sortState, setSortState] = useState('asc')
  const [releaseFilter, setReleaseFilter] = useState('All')

  const albums = useSelector(state => state.albums)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }



  const lodashSortedAlbums = () => {
    let sorted = _.sortBy(albums, sortMethod)

    if (releaseFilter !== 'All') {
      const filtered = _.filter(sorted, { 'released': releaseFilter })
      sorted = filtered
    }

    if (sortState === 'desc') {
      return sorted.reverse()
    } else {
      return sorted
    }
  }

  const sortBy = (field) => {
    setSortMethod(field)
    onSortChange()
  }

  //korjattava vielä loppuun
  const onSortChange = () => {
    const currentSort = sortState
    let nextSort

    if (currentSort === 'asc') nextSort = 'desc'
    else if (currentSort === 'desc') nextSort = 'asc'

    setSortState(nextSort)
  }

  const handleYearFilter = (event) => {
    setReleaseFilter(event.target.value)
    setPage(1)
  }

  const mappedYears = albums.map(album => album.released)
  const uniqueYears = _.uniq(mappedYears)
  const sortedUniqueYears = _.sortBy(uniqueYears)
  const finalYears = [...sortedUniqueYears.concat('All')]

  const indexOfLast = page * rowsPerPage
  const indexOfFirst = indexOfLast - rowsPerPage

  return (
    <div>
      <Grid container>
        <div className='inputField'>
          <p>Filter by year released: </p>
          <TextField select value={releaseFilter} onChange={handleYearFilter} variant="outlined" helperText="Select a specific year">
            {finalYears.map((year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            )))}
          </TextField>
        </div>
        <Grid item xs={12}>
          <TableContainer className='customPaper'>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h3 onClick={() => sortBy('title_lowerCase')}>Album title</h3>
                  </TableCell>
                  <TableCell>
                    <h3 onClick={() => sortBy('ratingAvg')}>Avg rating</h3>
                  </TableCell>
                  <TableCell>
                    <h3 onClick={() => sortBy('artist_lowerCase')}>Artist</h3>
                  </TableCell>
                </TableRow>
                {lodashSortedAlbums().slice(indexOfFirst, indexOfLast)
                  .map(album =>
                    <TableRow key={album.id}>
                      <TableCell>
                        <Link to={`/albums/${album.id}`}>
                          {album.title}
                        </Link>
                        <div>
                          ({album.released})
                        </div>
                      </TableCell>
                      <TableCell>
                        {album.ratingAvg} ({album.reviews.length})
                      </TableCell>
                      <TableCell>
                        <Link to={`/artists/${album.artistID.id ? album.artistID.id : album.artistID}`}>
                          {album.artist}
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <div className='pagination'>
        <Pagination
          count={Math.ceil(lodashSortedAlbums().length / rowsPerPage)}
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


export default AlbumList