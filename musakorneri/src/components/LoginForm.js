import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'

const LoginForm = () => {

  const username = useField('text')
  const password = useField('text')

  const handleLogin = (event) => {
    event.preventDefault()
    const user = ({
      username: username,
      password: password
    })
  }

  const formUsername = { ...username }
  delete formUsername.reset
  const formPassword = { ...password }
  delete formPassword.reset

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
}

export default LoginForm