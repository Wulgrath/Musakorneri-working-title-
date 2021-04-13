import React from 'react'
import { Container, Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { addReview } from '../reducers/reviewReducer'


const Home = () => {

  const reviews = useSelector(state => state.reviews)
  const albums = useSelector(state => state.albums)


  const latestReviews = reviews.slice(Math.max(reviews.length - 5, 0)).reverse()
  const latestAlbums = albums.slice(Math.max(albums.length - 5, 0)).reverse()


  return (
    <div>
      <h1>Welcome!</h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          Latest reviews
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {latestReviews.map(review =>
                  <TableRow key={review.id}>
                    <TableCell>
                      {review.album.title} by {review.album.artist}
                    </TableCell>
                    <TableCell>
                      {review.user.username}
                    </TableCell>
                    <TableCell>
                      {review.rating}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          Latest added albums
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {latestAlbums.map(album => 
                  <TableRow key={album.id}>
                    <TableCell>
                      {album.title} by {album.artist}
                    </TableCell>
                  </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Paper>Here are the latest news</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home