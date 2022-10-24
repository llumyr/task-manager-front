import axios from 'axios'

const api = axios.create({
  baseURL: 'http://taskmanager.daze.fun:1818'
})

api.interceptors.request.use(
  (config: any) => {
    if (localStorage.token) config.headers.bearer = localStorage.token
    return config
  }
)

export default api
