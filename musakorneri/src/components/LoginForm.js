import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import albumService from '../services/albums'
import reviewService from '../services/reviews'
import { Button, TextField} from '@material-ui/core'

const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('text')
  const loggedUser = useSelector(state => state.loggedUser)

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = ({
      username: username.value,
      password: password.value
    })
    dispatch(login(user))
    albumService.setToken(user.token)
    reviewService.setToken(user.token)
  }

  const formUsername = { ...username }
  delete formUsername.reset
  const formPassword = { ...password }
  delete formPassword.reset


    return (
      <div>
        <h1>Log into your account</h1>
        <form onSubmit={handleLogin}>
          <div className='inputField'>
            <TextField label="username" {...formUsername} variant="outlined"/>
          </div>
          <div className='inputField'>
            <TextField label="password" {...formPassword} type="password" variant="outlined"/>
            </div>
            <Button variant="contained" color="primary" id='loginButton' type='submit'>Login</Button>
        </form>
      </div>
    )
}

export default LoginForm