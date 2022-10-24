import api from '@/services/api'

const getGroups = async () => {
  return await api.get('/user/groups')
}

export { getGroups }
