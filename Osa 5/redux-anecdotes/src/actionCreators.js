const actionFor = {
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      id
    }
  },
  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      content
    }
  }
}

export default actionFor