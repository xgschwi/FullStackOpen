import React from 'react'

const Country = ({country}) => <p>{country}</p>

const Countries = ({countries, filter}) => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
    if(filtered.length > 1 && filtered.length < 11)
      return(
        <div>{
        filtered.map(country => <Country country ={country.name} key={country.name}/>)
        }
        </div>
      )

    else if (filtered.length === 1)
        return(
            <div>
                <h2>{filtered[0].name}</h2>
                <p>Capital {filtered[0].capital}</p>
                <p>Population {filtered[0].population}</p>

                <h3>Languages</h3>
                <ul>
                    {filtered[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                </ul>

                <img src={filtered[0].flag} height='100px' width='100px' alt="Country's flag"/>
            </div>
        )
    
    else return <div>Too many matches, specify another filter</div>   
}

export default Countries