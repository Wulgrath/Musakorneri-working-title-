import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/albums'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const getOne = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default {
  getAll, getOne, create, setToken
}