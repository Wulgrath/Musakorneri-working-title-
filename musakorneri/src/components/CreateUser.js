import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { createUser } from '../reducers/userReducer'
import { Button, TextField} from '@material-ui/core'

const CreateUser = () => {

  const dispatch = useDispatch()
  const history = useHistory()
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

  const formUsername = { ...username }
  delete formUsername.reset
  const formPassword = { ...password }
  delete formPassword.reset

  return (
    <div>
      <h1>Create a new account</h1>
      <form onSubmit={addUser}>
        <div>
          <TextField label="username" {...formUsername} variant="outlined" />
        </div>
        <div>
          <TextField label="password" {...formPassword} type="password" variant="outlined" />
        </div>
        <Button variant="contained" color="primary" id='loginButton' type='submit'>Create account</Button>
      </form>
    </div >
  )

}


export default CreateUser