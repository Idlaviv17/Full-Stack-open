import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(countries[0])
  const [filterChange, setFilterChange] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilterChange(true)
  }

  const handleOnClick = (country) => {
    setCountry(country)
    setFilterChange(false)
  }

  const showCountries = () => {
    return filteredCountries.map((country) =>
      <p key={country.name.common}>
        {country.name.common} {' '}
        <button onClick={() => handleOnClick(country)}>show</button>
      </p>
    )
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {country === undefined || filterChange
        ? filteredCountries.length > 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1
            ? <Country country={filteredCountries[0]} />
            : showCountries()
        : <Country country={country} />
      }
    </div>
  );
}

export default App;
