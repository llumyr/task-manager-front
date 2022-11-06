import api from '@/services/api'
import { AxiosResponse } from 'axios'

const signUp = async (username: string, password: string): Promise<AxiosResponse> => {
  return await api.post('/user/auth/sign-up', {
    username,
    password
  })
}

const signIn = async (username: string, password: string): Promise<AxiosResponse> => {
  return await api.post('/user/auth/sign-in', {
    username,
    password
  })
}

const tokenRefresh = async (): Promise<AxiosResponse> => {
  return await api.put('/user/auth/token/refresh')
}

export { signUp, signIn, tokenRefresh }
