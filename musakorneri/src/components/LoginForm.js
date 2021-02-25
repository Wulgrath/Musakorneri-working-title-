import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import albumService from '../services/albums'

const LoginForm = () => {

  const dispatch = useDispatch()

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
  }

  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const formUsername = { ...username }
  delete formUsername.reset
  const formPassword = { ...password }
  delete formPassword.reset


  if (!loggedUser) {
    return (
      <div>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>
              username:
            </Form.Label>
            <Form.Control {...formUsername} />
            <Form.Label>
              password:
            </Form.Label>
            <Form.Control {...formPassword} />
            <Button id='loginButton' type='submit'>Login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  } else {
    return (
      <div>
        <h5>Logged in as {loggedUser.username}</h5>
        <Button onClick={logOut}>Log Out</Button>
      </div>
    )
  }
}

export default LoginForm