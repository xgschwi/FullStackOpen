import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    let taken = false

    event.preventDefault()
    persons.forEach(person =>
      {
        if(person.name === newName){
          alert(`${newName} is already added to the phonebook`)
          taken = true
        }
      })


    
    if(!taken) {
      const newPerson = { name: newName, number: newNum}

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNum('')
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>

        <div>name: <input value = {newName} onChange = {handleNameChange}/></div>
        <div>number: <input value = {newNum} onChange = {handleNumChange}/></div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key = {person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App