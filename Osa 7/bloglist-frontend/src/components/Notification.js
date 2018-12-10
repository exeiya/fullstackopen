import React from 'react'

const Notification = ({ notification }) => {
  const errorStyle = {
    padding: '12px',
    borderStyle: 'solid',
    borderColor: '#C21807',
    marginBottom: '15px',
    color: '#B22222',
    textAlign: 'center'
  }
  const successStyle = {
    padding: '12px',
    borderStyle: 'solid',
    borderColor: '#29b739',
    marginBottom: '15px',
    color: '#1b7926',
    textAlign: 'center'
  }

  if (notification === null) {
    return null
  }

  return (
    <div>
      {notification.type === 'error' ?
        <div style={errorStyle}>{notification.msg}</div> :
        <div style={successStyle}>{notification.msg}</div>
      }
    </div>
  )
}

export default Notification