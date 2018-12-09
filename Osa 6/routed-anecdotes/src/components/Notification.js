import React from 'react'

const Notification = ({ msg }) => {
  const notificationStyle = {
    backgroundColor: ' #eaf6d5',
    color: '#79a824',
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#79a824',
    borderStyle: 'solid',
    borderWidth: '3px',
    padding: '10px'
  }

  if (msg === '') return null

  return (
    <div style={notificationStyle}>
      {msg}
    </div>
  )
}

export default Notification