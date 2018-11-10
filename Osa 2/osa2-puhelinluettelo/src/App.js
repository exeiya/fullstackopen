import React from 'react';
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
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
      return this.updatePerson()
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
      .create(personObject)
      .then(person => {
        this.setState({
          persons: this.state.persons.concat(person),
          newName: '',
          newNumber: ''
        })
      })
      .catch(error => {
        console.log('Could not retrieve persons from server')
      })
  }

  updatePerson = () => {
    if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.find(person => person.name === this.state.newName).id
      }

      personService
        .update(personObject)
        .then(updatedPerson => {
          const persons = this.state.persons.filter(person => person.id !== updatedPerson.id)
          this.setState({
            persons: persons.concat(updatedPerson),
            newName: '',
            newNumber: ''
          })
        })
        .catch(error => {
          console.log('Something went wrong with updating person information')
        })
    }
  }

  deletePerson = (person) => () => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .deleteId(person.id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== person.id)
          })
        })
        .catch(error => {
          console.log('Something went wrong while trying to delete person information')
        })
    }
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
            {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={this.deletePerson(person)} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
