import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import { createUser } from '../reducers/userReducer'

const CreateUser = () => {

  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('text')

  const addUser = async (event) => {
    event.preventDefault()
    const content = {
      username: username.value,
      password: password.value
    }
    dispatch(createUser(content))
  }

  const formUsername = {...username}
  delete formUsername.reset
  const formPassword = {...password}
  delete formPassword.reset
  
  return (
    <div>
      <h1>Create a new account</h1>
      <Form onSubmit={addUser}>
        <Form.Group>
          <Form.Label>
            Username:
          </Form.Label>
          <Form.Control {...formUsername}/>
          <Form.Label>
            Password:
          </Form.Label>
          <Form.Control {...formPassword}/>
          <Button type="submit">Create account</Button>
        </Form.Group>
      </Form>
    </div>
  )

}


export default CreateUser