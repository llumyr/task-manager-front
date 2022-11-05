import api from '@/services/api'
import { AxiosResponse } from 'axios'

const getGroups = async (): Promise<AxiosResponse> => {
  return await api.get('/user/groups')
}

export { getGroups }
