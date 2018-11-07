import React from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    
    if (this.state.persons.some(person => person.name === this.state.newName)) {
      alert(`Person named ${this.state.newName} exists already`)
      return
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(personObject)
    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })
  }

  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    const personsToShow = this.state.filter === '' ? this.state.persons : filteredPersons

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <PersonForm 
          addPerson={this.addPerson}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map(person => <Person key={person.name} person={person} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
