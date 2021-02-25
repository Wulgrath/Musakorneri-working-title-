import React from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { useSelector } from 'react-redux'

const Album = () => {

  const comment = useField('text')
  const albums = useSelector (state => state.albums)

  const id = useParams().id
  const thisAlbum = albums.find(n => n.id === id)


  const formComment = {...comment}
  delete formComment.reset


  if (thisAlbum) {
    return (
      <div>
        <h2>{thisAlbum.title} by {thisAlbum.artist}</h2>
      </div>
    )
  } else {
    return null
  }

}



export default Album