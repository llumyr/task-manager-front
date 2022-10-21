import axios from 'axios'

const api = axios.create({
  baseURL: 'http://taskmanager.daze.fun:1818'
})

export default api
