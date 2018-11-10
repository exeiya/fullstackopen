import React from 'react';
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
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

  updatePerson = (personObject) => {
    const personId = this.state.persons.find(person => person.name === this.state.newName).id
    if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      personService
        .update(personObject, personId)
        .then(updatedPerson => {
          const persons = this.state.persons.filter(person => person.id !== updatedPerson.id)
          this.setState({
            persons: persons.concat(updatedPerson),
            newName: '',
            newNumber: '',
            notification: `Muutettiin henkilön ${updatedPerson.name} numero`
          })
          setTimeout(() => {
            this.setState({notification: null})
          }, 3000)
        })
        .catch(error => {
          const persons = this.state.persons.filter(person => person.id !== personId)
          this.addPerson(personObject, persons, `Uudelleenlisättiin henkilö ${personObject.name}`)
        })
    }
  }

  addPerson = (newPerson, persons, notification) => {
    personService
      .create(newPerson)
      .then(person => {
        this.setState({
          persons: persons.concat(person),
          newName: '',
          newNumber: '',
          notification
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 3000)
      })
      .catch(error => {
        console.log('Could not retrieve persons from server')
      })
  }

  handlePersonForm = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      return this.updatePerson(personObject)
    }

    this.addPerson(personObject, this.state.persons, `Lisättiin henkilö ${personObject.name}`)
  }

  
  deletePerson = (person) => () => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .deleteId(person.id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== person.id),
            notification: `Poistettiin henkilö ${person.name}`
          })
          setTimeout(() => {
            this.setState({notification: null})
          }, 3000)
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
        <Notification message={this.state.notification} />
        <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <PersonForm 
          handleForm={this.handlePersonForm}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={this.deletePerson(person)} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
