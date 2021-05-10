import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums } from '../reducers/albumReducer'
import { addReview } from '../reducers/reviewReducer'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, TablePagination, Grid, Typography, Slider } from '@material-ui/core'
import * as _ from 'lodash'

const AlbumList = () => {

  /*const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAlbums())
  }, [dispatch])*/

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sliderValue, setSliderValue] = useState([30, 40])
  let [state, setState] = useState('default')

  const albums = useSelector(state => state.albums)

  let sortedAlbums = [...albums]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const lodashSortedAlbums = _.sortBy(albums, 'title')


  /*<Typography id="range-slider" gutterBottom>
  Year released: {valueText()}
</Typography>
<div>
  <Slider
    value={sliderValue}
    onChange={handleSliderChange}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
    getAriaValueText={valueText}
    style={{ width: 300 }}
  />
</div>
  const valueText = (sliderValue) => {
    return `${sliderValue}`
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
  }



  const onSortChange = () => {
    const currentSort = state
    let nextSort

    if (currentSort === 'down') nextSort = 'up'
    else if(currentSort === 'up') nextSort = 'default'
    else if(currentSort === 'default') nextSort = 'down'

    setState(nextSort)
  }
  console.log(state)

  const sortTypes = {
    up: {
      class: 'sort-up',
      fn: (a, b) => a.ratingAvg - b.ratingAvg
    },
    down: {
      class: 'sort-down',
      fn: (a, b) => b.ratingAvg - a.ratingAvg
    }, 
    default: {
      class: 'sort',
      fn: (a, b) => a
    }
  }*/

  return (
    <div>
      <Grid container>

        <Grid item xs={12}>
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
                {lodashSortedAlbums.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        count={sortedAlbums.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </div>
  )

}


export default AlbumList