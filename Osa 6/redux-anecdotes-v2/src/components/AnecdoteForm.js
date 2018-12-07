import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ anecdoteCreation, setNotification, removeNotification }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    anecdoteCreation(event.target.anecdote.value)
    setNotification(`Added anecdote ${event.target.anecdote.value}`)
    event.target.anecdote.value = ''
    setTimeout(() => {
      removeNotification()
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

export default connect(
  null,
  { anecdoteCreation, setNotification, removeNotification }
)(AnecdoteForm)