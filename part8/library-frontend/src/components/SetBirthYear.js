import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import Select from 'react-select'
import { ALL_AUTHORS, CHANGE_AUTHOR } from "../queries"

const SetBirthYear = ( { authors } ) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ editAuthor ] = useMutation(CHANGE_AUTHOR, {refetchQueries: [ { query: ALL_AUTHORS } ] } )

  const options = authors.map(a => { return { value: a.name, label: a.name } } )

  const submit = (e) => {
    e.preventDefault()
    editAuthor( { variables: { name, setBornTo: Number(born) } })

    setBorn('')
  }

  return(
    <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={submit}>
            <Select defaultValue={name} onChange={(props) => setName(props.value)} options={options}/>
            <div>Born <input value={born} type='text' onChange={({target}) => setBorn(target.value)}/></div>
            <button type='submit'>Update Author</button>
        </form>
    </div>
  )
}

export default SetBirthYear
