import api from '@/services/api'

const signUp = async (username: string, password: string) => {
  return await api.post('/user/sign-up', {
    username,
    password
  })
}

const signIn = async (username: string, password: string) => {
  return await api.post('/user/sign-in', {
    username,
    password
  })
}

const tokenRefresh = async () => {
  return await api.put('/user/token/refresh')
}

export { signUp, signIn, tokenRefresh }
