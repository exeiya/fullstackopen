import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const { good, ok, bad } = store.getState()
  const total =  good + ok + bad
  const average = Math.round(10 * (good - bad) / total) / 10
  const positives = Math.round(1000 * good / total) /10

  if (total === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)
