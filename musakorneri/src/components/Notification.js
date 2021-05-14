import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { CircularProgress } from '@material-ui/core'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const errorNotification = useSelector(state => state.errorNotification)
  const loading = useSelector(state => state.loading)

  if (loading) {
    return (
      <div className='loading'>
          <CircularProgress />
      </div>
    )
  }

  else if (notification) {
    return (
      <div>
        <Alert severity='success' color='info'>
          {notification}
        </Alert>
      </div>
    )
  } else if (errorNotification) {
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