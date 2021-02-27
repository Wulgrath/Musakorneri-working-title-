import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Artist = () => {

  const artists = useSelector( state => state.artists)
  const id = useParams().id
  const thisArtist = artists.find(n => n.id === id)

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
            </tr>
            {thisArtist.albums.map(album =>
              <tr key={album.id}>
                <td>
                  <Link to={`/albums/${album.id}`}>
                    {album.title}
                  </Link>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    )
  } else {
    return null
  }


}


export default Artist