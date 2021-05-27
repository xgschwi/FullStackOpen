import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DisplayWeather = ({capital}) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {axios.get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + capital)
    .then(response => {
        setWeather(response.data.current)
    })
},[])

return(
    <div>
        <h2>Weather in {capital}</h2>
        <p><strong>Temperature</strong> {weather.temperature} Degrees Celsius</p>
        <img src={weather.weather_icons[0]} alt="Weather icon"/>
        <p><strong>Wind</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
)
}
export default DisplayWeather