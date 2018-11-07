import React, { Component } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

class App extends Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;nativeName;capital;population;flag')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (country) => () => {
    this.setState({ filter: country })
  }

  render() {
    const countriesToShow = this.state.filter === '' ? [] : this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <Countries countries={countriesToShow} handleClick={this.handleClick} />
      </div>
    )
  }
}

export default App
