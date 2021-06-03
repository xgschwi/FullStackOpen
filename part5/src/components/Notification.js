import React from 'react'

const Notification = ({flag, message}) => {

    if(message === null) return null

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
        return (<div style={successStyle}>{message}</div>)
    else
        return <div style={errorStyle}>{message}</div>

}

export default Notification