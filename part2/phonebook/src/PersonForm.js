import React from 'react'
import axios from 'axios'

// Takes in new people to phonebook
const PersonForm = ({newName, newNum, persons, setName, setNum, setPersons}) => {
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

          // Adds a new person to server
          axios.post('http://localhost:3001/persons', newPerson)
          .then(response => {console.log(response.data)})
          setName('')
          setNum('')
        }
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