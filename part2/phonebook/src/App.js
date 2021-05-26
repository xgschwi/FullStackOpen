import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')

  const hook = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => { setPersons(response.data)})
  }

  useEffect(hook,[])

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