import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    rajaa näytettäviä: <input value={filter} onChange={handleFilterChange} />
  </div>
)

export default Filter