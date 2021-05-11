import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const errorNotification = useSelector(state => state.errorNotification)

  if (notification) {
    return (
      <div>
        <Alert className='notificationSuccess'>
          {notification}
        </Alert>
      </div>
    )
  } else if (errorNotification){
    return (
      <div>
        <Alert severity='error'>
          {errorNotification}
        </Alert>
      </div>
    )
  } else {
    return null
  }
}

export default Notification