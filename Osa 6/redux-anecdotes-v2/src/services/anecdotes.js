import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const create = async (content) => {
  const res = await axios.post(url, { content, votes: 0 })
  return res.data
}

const updateVotes = async (id, votes) => {
  const res = await axios.patch(`${url}/${id}`, { votes: votes + 1 })
  return res.data
}

export default { getAll, create, updateVotes }