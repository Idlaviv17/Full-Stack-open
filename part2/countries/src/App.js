import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

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
  }

  const showCountries = () => {
    return filteredCountries.map(country =>
      <p key={country.name.common}>{country.name.common}</p>
    )
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {filteredCountries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 1
          ? <Country country={filteredCountries[0]} />
          : showCountries()
      }
    </div>
  );
}

export default App;
