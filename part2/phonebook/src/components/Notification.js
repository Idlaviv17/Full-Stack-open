import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
      return null
  }

  let notificationStyle = {
    fontSize: 22,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: 'lightGrey',
    marginBottom: 10,
    padding: 8
  }

  message.action === 'update'
    ? notificationStyle = {...notificationStyle, color: 'green'}
    : notificationStyle = {...notificationStyle, color: 'red'}

  return (
      <div style={notificationStyle}>
          {message.content}
      </div>
  )
}

export default Notification
