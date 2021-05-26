import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
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
      const newPerson = { name: newName}

      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value = {newName} onChange = {handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key = {person.name}>{person.name}</p>)}
    </div>
  )
}

export default App