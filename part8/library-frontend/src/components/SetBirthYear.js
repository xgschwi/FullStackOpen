import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { ALL_AUTHORS, CHANGE_AUTHOR } from "../queries"

const SetBirthYear = () => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ editAuthor ] = useMutation(CHANGE_AUTHOR, {refetchQueries: [ { query: ALL_AUTHORS } ] } )

  const submit = (e) => {
    e.preventDefault()
    editAuthor( { variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return(
    <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={submit}>
            <div>Name: <input value={name} type='text' onChange={({target}) => setName(target.value)}/></div>
            <div>Born <input value={born} type='text' onChange={({target}) => setBorn(target.value)}/></div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default SetBirthYear
