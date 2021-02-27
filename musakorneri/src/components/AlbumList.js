import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initAlbums } from '../reducers/albumReducer'
import { Table } from 'react-bootstrap'

const AlbumList = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAlbums())
  }, [dispatch])

  const albums = useSelector (state => state.albums)

  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <td>
             <h4>Album title</h4> 
            </td>
            <td>
              <h4>Artist</h4>
            </td>
          </tr>
          {albums.map(album =>
            <tr key={album.id}>
              <td>
                <Link to={`/albums/${album.id}`}>
                {album.title}
                </Link>
              </td>
              <td>
                <Link to={`/artists/${album.artistID.id}`}>
                {album.artist}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

}


export default AlbumList