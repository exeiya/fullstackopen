import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  handleClick = () => () => {
    const anecdote = Math.floor(Math.random() * 6)
    this.setState({ selected: anecdote })
  }

  handleVote = (anecdote) => () => {
    const votes = [...this.state.votes]
    votes[anecdote] += 1
    this.setState({ votes: votes })
  }

  mostVotes = () => {
    const highestAmount = Math.max(...this.state.votes)
    return this.state.votes.findIndex(val => val === highestAmount)
  }

  render() {
    const anecdote = this.props.anecdotes[this.state.selected]
    const votes = this.state.votes[this.state.selected]
    
    return (
      <div>
        { anecdote }<br />
        has { votes } votes <br />
        <button onClick={ this.handleVote(this.state.selected) }> vote </button>
        <button onClick={ this.handleClick() }> next anecdote </button>

        <h2>anecdote with most votes:</h2>
        { this.props.anecdotes[this.mostVotes()] } <br />
        has { this.state.votes[this.mostVotes()] } votes

      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
