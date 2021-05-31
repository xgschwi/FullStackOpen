import React from 'react'
import phonebookServices from './services/phonebook'

// Takes in new people to phonebook
const PersonForm = ({newName, newNum, persons, setName, setNum, setPersons, setNotification, setFlag}) => {

  const addPerson = (event) => {
    event.preventDefault()

      const newPerson = { name: newName, number: newNum}
  
      phonebookServices.create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(newPerson))
        setFlag(true)
        setNotification(`Added ${newName}`)
      })

      // Catch error where this person is no longer present in the server
      .catch(e => {
        setFlag(false)
        setNotification(e.response.data.error)
      })

    // Reset Notification
    setTimeout(() => {setFlag(false)}, 11000)
    setTimeout(() => {setNotification(null)}, 10000)

    setName('')
    setNum('')
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
    
  const handleNumChange = (event) => {
    setNum(event.target.value)
  }

  return(
    <form onSubmit={addPerson}>
      <div>name: <input value = {newName} onChange = {handleNameChange}/></div>
      <div>number: <input value = {newNum} onChange = {handleNumChange}/></div>

      <div>
          <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm