import React from 'react'
import { Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
        <Grid item xs={12} sm={6}>
          <h4>Latest reviews</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {latestReviews.map(review =>
                  <TableRow key={review.id}>
                    <TableCell>
                      <Link to={`/albums/${review.album.id}`}>
                        {review.album.title}
                      </Link> by <Link to={`/artists/${review.album.artistID}`}>{review.album.artist}</Link>
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
        <Grid item xs={12} sm={6}>
          <h4>Latest added albums</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {latestAlbums.map(album =>
                  <TableRow key={album.id}>
                    <TableCell>
                      <Link to={`/albums/${album.id}`}>
                      {album.title} 
                      </Link> by <Link to={`/artists/${album.artistID.id ? album.artistID.id : album.artistID}`}>{album.artist}
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <h4>News</h4>
          <Paper>Here are the latest news</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home