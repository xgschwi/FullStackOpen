import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const flag = useSelector(state => state.flag)
  if(!notification) return null

  if(flag)
    return <Alert variant='success'>{notification}</Alert>
  else
    return <Alert className='danger'>{notification}</Alert>

}

export default Notification