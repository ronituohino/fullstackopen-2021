import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  if(notification === '') {
    return ( <></> )
  } else {
    let style = {}
    if(notification.error) {
      style = { color: 'red' }
    } else {
      style = { color: 'green' }
    }

    return (
      <>
        <h3 className='error' style={style}>{notification.message}</h3>
      </>
    )
  }
}

export default Notification