const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 })
    case 'NEW_ANECDOTE':
      return state.concat(asObject(action.data))
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default anecdoteReducer