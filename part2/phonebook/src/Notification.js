import React from 'react'

const Notification = ({flag, message}) => {

    if(message === null) return null

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(flag)
        return (<div style={successStyle}>{message}</div>)
    else
        return <div style={errorStyle}>{message}</div>

}

export default Notification