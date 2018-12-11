import React from 'react'
import { connect } from 'react-redux'

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
      {notification.error ?
        <div style={errorStyle}>{notification.msg}</div> :
        <div style={successStyle}>{notification.msg}</div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)