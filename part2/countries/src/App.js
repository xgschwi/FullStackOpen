import React, {useState} from 'react'
import axios from 'axios'
import Countries from './Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [cState, setCState] = useState('')
  
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => setCountries(response.data))
  
  const handleChangeFilter = (event) => {
    setCState('')
    setFilter(event.target.value)

  }

  return (
    <div>
        <p>Find Countries: <input value = {filter} onChange = {handleChangeFilter}/></p>
        <Countries countries={countries} filter={filter}
        cState={cState} setCState={setCState}/>
    </div>
  );
}

export default App;
