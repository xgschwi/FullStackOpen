import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import phonebookServices from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ flag, setFlag] = useState(false)
  useEffect(() => {
    phonebookServices.getAll()
    .then(response => setPersons(response))
  },[])

  return (
    <div>
      <Notification flag={flag} message={notification}/>

      <h2>Phonebook</h2>
      
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>

      <PersonForm newName={newName} newNum={newNum} persons={persons}
      setName={setNewName} setNum={setNewNum} setPersons={setPersons}
      setNotification={setNotification} setFlag={setFlag}/>


      <h2>Numbers</h2>
      
      <Persons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App