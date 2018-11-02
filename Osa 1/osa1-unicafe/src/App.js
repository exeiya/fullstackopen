import React, { Component } from 'react';

const Button = ({ handler, label }) => (
  <button onClick={handler}>{label}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad

  const calcAverage = () => Math.round(10 * (good - bad) / getTotal()) / 10

  const calcPositives = () => Math.round(1000 * good / getTotal()) /10

  if (getTotal() === 0) {
    return (
      <div>
        ei yhtään palautetta annettu
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text='hyvä' value={good} />
          <Statistic text='neutraali' value={neutral} />
          <Statistic text='huono' value={bad} />
          <Statistic text='keskiarvo' value={calcAverage()} />
          <Statistic text='positiivisia' value={calcPositives() + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }
  
  handleClick = (button, value) => () => {
    this.setState({ [button]: value + 1 })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handler={this.handleClick('good', this.state.good)} label={"hyvä"} />
        <Button handler={this.handleClick('neutral', this.state.neutral)} label={"neutraali"} />
        <Button handler={this.handleClick('bad', this.state.bad)} label={"huono"} />
        <h1>Statistiikka</h1>
        <Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} />
      </div>
    );
  }
}

export default App;
