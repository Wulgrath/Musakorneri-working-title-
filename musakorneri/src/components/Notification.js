import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const errorNotification = useSelector(state => state.errorNotification)

  if (notification) {
    return (
      <div>
        <Alert variant='success'>
          {notification}
        </Alert>
      </div>
    )
  } else if (errorNotification){
    return (
      <div>
        <Alert variant='danger'>
          {errorNotification}
        </Alert>
      </div>
    )
  } else {
    return null
  }
}

export default Notification