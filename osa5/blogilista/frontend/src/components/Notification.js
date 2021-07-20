const Notification = (props) => {
  if(props.notification === null) {
    return ( <></> )
  } else {
    let style = {}
    if(props.notification.error) {
      style = { color: 'red' }
    } else {
      style = { color: 'green' }
    }

    return (
      <>
        <h3 style={style}>{props.notification.message}</h3>
      </>
    )
  }
}

export default Notification