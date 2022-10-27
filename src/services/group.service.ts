import api from '@/services/api'

const createGroup = async (title: string) => {
  return await api.post('/group', { title })
}

const getGroup = async (_id: string) => {
  return await api.get(`/group/${_id}`)
}

const updateGroup = async (title: string) => {
  return await api.put('/group', { title })
}

const deleteGroup = async (_id: string) => {
  return await api.delete(`/group/${_id}`)
}

const moveGroup = async (_id: string, move: string) => {
  return await api.put('/group/move', { _id, move })
}

export { updateGroup, deleteGroup, createGroup, moveGroup, getGroup }
