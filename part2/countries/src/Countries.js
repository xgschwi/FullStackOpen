import React, {useState} from 'react'

const DisplayCountry =({country}) => {
    return(
    <div>
        <h2>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>

        <h3>Languages</h3>
        <ul>
            {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>

        <img src={country.flag} height='100px' width='100px' alt="Country's flag"/>
    </div>)
}

const display = (country) => {
    return <DisplayCountry country={country}/>
}

const Country = ({country}) => <p>{country}</p>

// Created to work around conditional statement to
// Display the country information
const doNothing = () => {

}

const Countries = ({countries, filter, cState, setCState}) => {
    
    // Gives each button a unique key
    let i = 0
    
    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    // When filtered results are between 2 and 10,
    // display country name and button to display
    // details about the country
    
    // The button changes a use state that dictates
    // whether or not country information is displayed
    if(filtered.length > 1 && filtered.length < 11)
      return(
        <div>
            {
            filtered.map(country => 
                <div key={country.name}>
                    {country.name}
                    <button key={i++} onClick={() => {
                      setCState(country.name)
                    }}>Show</button>
                
                    {
                        cState === country.name
                        ? display(country, setCState)
                        : doNothing()
                    }
                </div>)
        
            }
        </div>
      )

    else if (filtered.length === 1) {
        return display(filtered[0])
    }
    
    else return <div>Too many matches, specify another filter</div>   
}

export default Countries