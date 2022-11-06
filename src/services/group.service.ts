import api from '@/services/api'
import { AxiosResponse } from 'axios'

const createGroup = async (title: string): Promise<AxiosResponse> => {
  return await api.post('/group', { title })
}

const getGroup = async (_id: string): Promise<AxiosResponse> => {
  return await api.get(`/group/${_id}`)
}

const updateGroup = async (_id: string, title: string): Promise<AxiosResponse> => {
  return await api.put(`/group/${_id}`, { title })
}

const deleteGroup = async (_id: string): Promise<AxiosResponse> => {
  return await api.delete(`/group/${_id}`)
}

export { createGroup, getGroup, updateGroup, deleteGroup }
