import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Artist = () => {

  const artists = useSelector( state => state.artists)
  const id = useParams().id
  const thisArtist = artists.find(n => n.id === id)

  if (thisArtist) {
    return (
      <div> 
        <h2>
          {thisArtist.name}
        </h2>
      </div>
    )
  } else {
    return null
  }


}


export default Artist