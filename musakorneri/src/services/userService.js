import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}

export default {
  getAll, create
}