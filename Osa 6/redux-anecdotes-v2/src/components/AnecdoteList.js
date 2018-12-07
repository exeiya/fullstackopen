import React from 'react'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()
  const vote = (anecdote) => () => {
    store.dispatch(voteAnecdote(anecdote.id))
    store.dispatch(setNotification(`Voted anecdote ${anecdote.content}`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  const anecdotesToShow = filter === null ? anecdotes : anecdotes.filter(a => a.content.includes(filter))

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={vote(anecdote)}
        />
      )}
    </div>
  )

}

export default AnecdoteList