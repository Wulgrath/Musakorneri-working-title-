import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/albums'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default {
  getAll, create
}