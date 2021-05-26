import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>

      <PersonForm newName={newName} newNum={newNum} persons={persons}
      setName={setNewName} setNum={setNewNum} setPersons={setPersons}/>


      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App