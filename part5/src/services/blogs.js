import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {headers: {authorization: token}}

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return res.data
}

const remove = async blog => {
  const config = {headers: {authorization: token}}
  
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}
const exportObj = { getAll, setToken, create, update, remove }

export default exportObj