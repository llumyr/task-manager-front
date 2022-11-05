import api from '@/services/api'
import { AxiosResponse } from 'axios'

const signUp = async (username: string, password: string): Promise<AxiosResponse> => {
  return await api.post('/user/sign-up', {
    username,
    password
  })
}

const signIn = async (username: string, password: string): Promise<AxiosResponse> => {
  return await api.post('/user/sign-in', {
    username,
    password
  })
}

const tokenRefresh = async (): Promise<AxiosResponse> => {
  return await api.put('/user/token/refresh')
}

export { signUp, signIn, tokenRefresh }
