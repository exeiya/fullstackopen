import React from 'react'

const PersonForm = ({ handleForm, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={handleForm}>
    <div>
      nimi: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      numero: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

export default PersonForm