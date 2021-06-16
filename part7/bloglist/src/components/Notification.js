import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const flag = useSelector(state => state.flag)
  if(!notification) return null

  const successStyle = {
    color: 'green',
    borderColor: 'green',
    background: 'aliceBlue',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 'auto',
    textAlign: 'center',
    width: 400
  }

  const errorStyle = {
    color: 'red',
    borderColor: 'red',
    background: 'aliceBlue',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 'auto',
    textAlign: 'center',
    width: 700
  }

  if(flag)
    return (<div className="success" style={successStyle}>{notification}</div>)
  else
    return <div className="error" style={errorStyle}>{notification}</div>

}

export default Notification