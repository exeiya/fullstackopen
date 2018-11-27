import React from 'react';
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

class App extends React.Component {

  render() {
    return (
      <div>
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App