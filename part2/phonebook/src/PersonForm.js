import React from 'react'
import phonebookServices from './services/phonebook'

// Takes in new people to phonebook
const PersonForm = ({newName, newNum, persons, setName, setNum, setPersons, setNotification, setFlag}) => {

  const addPerson = (event) => {
      event.preventDefault()
      const result = persons.find(person => person.name === newName)
       
      // If the person did not exist in the phonebook 
      if(result === undefined) {
        const newPerson = { name: newName, number: newNum}
    
        phonebookServices.create(newPerson)
        setPersons(persons.concat(newPerson))
        setFlag(true)
        setNotification(`Added ${newName}`)
      }

      // If the person's number is updated
      else {
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const newPerson = {...result, number: newNum}

          phonebookServices.update(newPerson)
          setPersons(persons.map(person => person.id !== newPerson.id
            ? person
            : {...person, number: newNum})
          )

          setFlag(true)
          setNotification(`Updated ${newName}'s number`)
        }
      }

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