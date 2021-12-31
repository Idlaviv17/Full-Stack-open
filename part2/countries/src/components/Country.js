import React from 'react'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map((language) =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={Object.values(country.flags)[0]} alt={country.name.common} width="100px" />
        </div>
    )
}

export default Country
