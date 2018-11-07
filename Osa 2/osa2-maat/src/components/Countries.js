import React from 'react'
import Country from './Country'

const Countries = ({ countries, handleClick }) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length > 10) {
    return (
      <div>too many matches, specify another filter</div>
    )
  } else {
    return (
      countries.map(country => <div key={country.name} onClick={handleClick(country.name)}>{country.name}</div>)
    )
  }
}

export default Countries