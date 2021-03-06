import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotesToShow, voteAnecdote, notify }) => {
  const vote = (anecdote) => () => {
    voteAnecdote(anecdote.id, anecdote.votes)
    notify(`Voted anecdote ${anecdote.content}`, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotesToShow.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={vote(anecdote)}
        />
      )}
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return filter === null ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
      .sort((a, b) => b.votes - a.votes)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)