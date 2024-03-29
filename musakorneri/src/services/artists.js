import axios from 'axios'

const baseUrl = '/api/artists'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const getOne = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export default {
  getAll, getOne
}