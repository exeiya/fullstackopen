import React from 'react'

const Country = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h2>{ country.name } { country.nativeName }</h2>
      <p>capital: { country.capital }</p>
      <p>population: { country.population }</p>
      <img src={country.flag} height='200' alt='flag' />
    </div>
  )
}

export default Country