import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import { initAlbums } from '../reducers/albumReducer'
import { initSingleArtist } from '../reducers/singleArtistReducer'


const Artist = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  
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
        <Table striped>
          <tbody>
            <tr>
              <td><h4>Albums</h4></td>
              <td><h4>Released</h4></td>
              <td><h4>Avg rating</h4></td>
            </tr>
            {thisArtistAlbums.map(album =>
              <tr key={album.id}>
                <td>
                  <Link to={`/albums/${album.id}`}>
                  {album.title}
                  </Link>          
                </td>
                <td>
                  {album.released}
                </td>
                <td>
                {Math.round((album.reviews.map(review => review.rating).reduce((a, b) => a + b, 0) / album.reviews.map(review => review.rating).length + Number.EPSILON) * 100) / 100}
                </td>
              </tr>
              )}
          </tbody>
        </Table>
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