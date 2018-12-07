import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(anecdoteCreation(event.target.anecdote.value))
    store.dispatch(setNotification(`Added anecdote ${event.target.anecdote.value}`))
    event.target.anecdote.value = ''
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm