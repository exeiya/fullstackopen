import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ msg }) => {

  if (msg === '') return null

  return (
    <div>
      <Alert bsStyle="success">{msg}</Alert>
    </div>
  )
}

export default Notification