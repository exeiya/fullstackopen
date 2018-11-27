import React from 'react'
import Anecdote from './Anecdote'
import actionFor from '../actionCreators'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()
  const voteAnecdote = (id) => () => {
    store.dispatch(actionFor.voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote=>
          <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            vote={voteAnecdote(anecdote.id)} 
          /> 
        )}
    </div>
  )

}

export default AnecdoteList