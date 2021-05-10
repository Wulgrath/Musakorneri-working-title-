import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, TablePagination, Grid, TextField, MenuItem } from '@material-ui/core'
import * as _ from 'lodash'

const AlbumList = () => {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sliderValue, setSliderValue] = useState([0, 2021])
  const [sortMethod, setSortMethod] = useState('title')
  const [sortState, setSortState] = useState('asc')
  const [releaseFilter, setReleaseFilter] = useState('All')

  const albums = useSelector(state => state.albums)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
  }

  const mappedYears = albums.map(album => album.released)
  const uniqueYears = _.uniq(mappedYears)
  const sortedUniqueYears = _.sortBy(uniqueYears)
  const finalYears = [...sortedUniqueYears.concat('All')]

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
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h3 onClick={() => sortBy('title')}>Album title</h3>
                  </TableCell>
                  <TableCell>
                    <h3 onClick={() => sortBy('ratingAvg')}>Avg rating</h3>
                  </TableCell>
                  <TableCell>
                    <h3 onClick={() => sortBy('artist')}>Artist</h3>
                  </TableCell>
                </TableRow>
                {lodashSortedAlbums().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={lodashSortedAlbums().length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )

}


export default AlbumList