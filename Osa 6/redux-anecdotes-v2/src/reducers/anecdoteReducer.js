import anecdoteService from '../services/anecdotes'

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

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnecdote = (id, votes) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(id, votes)
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer