import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import albumService from '../services/albums'
import reviewService from '../services/reviews'

const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('text')
  const loggedUser = useSelector(state => state.loggedUser)

  const handleLogin = (event) => {
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
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>
              username:
            </Form.Label>
            <Form.Control {...formUsername} />
            <Form.Label>
              password:
            </Form.Label>
            <Form.Control {...formPassword} type='password'/>
            <Button id='loginButton' type='submit'>Login</Button>
          </Form.Group>
        </Form>
      </div>
    )
}

export default LoginForm