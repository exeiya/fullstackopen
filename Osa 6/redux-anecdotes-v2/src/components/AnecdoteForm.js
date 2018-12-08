import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({ anecdoteCreation, setNotification, removeNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    anecdoteCreation(newAnecdote)
    setNotification(`Added anecdote ${content}`)
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