import React from 'react'
import { Grid, Paper, TableContainer, Table, TableBody, TableRow, TableCell, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {

  const reviews = useSelector(state => state.reviews)
  const albums = useSelector(state => state.albums)


  const latestReviews = reviews.slice(Math.max(reviews.length - 5, 0)).reverse()
  const latestAlbums = albums.slice(Math.max(albums.length - 5, 0)).reverse()


  return (
    <div>
      <h2>Welcome!</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <h4>Latest reviews</h4>
          <TableContainer className='customPaper'>
            <Table>
              <TableBody>
                {latestReviews.map(review =>
                  <TableRow key={review.id}>
                    <TableCell>
                      <Link to={`/albums/${review.album.id}`}>
                        {review.album.title_capitalized || review.album.title}
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
          <TableContainer className='customPaper'>
            <Table>
              <TableBody>
                {latestAlbums.map(album =>
                  <TableRow key={album.id}>
                    <TableCell>
                      <Link to={`/albums/${album.id}`}>
                        {album.title_capitalized || album.title}
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
          <div className='customPaper'>Here are the latest news</div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home