import React from 'react'
import actionFor from '../actionCreators'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(actionFor.anecdoteCreation(event.target.anecdote.value))
    event.target.anecdote.value = ''
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