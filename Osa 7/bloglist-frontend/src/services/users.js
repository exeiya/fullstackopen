import axios from 'axios'

const url = '/api/users'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

export default { getAll }