import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {

    const [weather, setWeather] = useState({
        weather: [{
            icon: '03d'
        }],
        main: {
            temp: 0
        },
        wind: {
            speed: 0,
            deg: 0
        }
    })

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${API_KEY}`)
            .then(response => setWeather(response.data))
    }, [])

    return (
        <div>
            <h1><strong>{country.name.common}</strong></h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h3><strong>Spoken languages</strong></h3>
            <ul>
                {Object.values(country.languages).map((language) =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={Object.values(country.flags)[0]} alt={country.name.common} width="100px" />
            <h3><strong>Weather in {country.capital[0]}</strong></h3>
            <p><strong>temperature: </strong>{weather.main.temp} Fahrenheit</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather' width="100px" />
            <p><strong>wind: </strong>{weather.wind.speed} mph direction {weather.wind.deg}°</p>
        </div>
    )
}

export default Country
