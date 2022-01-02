import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (!checkExistence(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(newName)
      }
      setNewNumber('')
      setNewName('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setMessage({
          content: `Added ${newPerson.name}`,
          action: 'update'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(returnedPerson => {
        setPersons(
          persons.map(person => (person.id !== id ? person : returnedPerson))
        )
      })
    }
  }

  const updatePerson = personName => {
    const person = persons.find(n => n.name === personName)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== changedPerson.id ? person : returnedPerson
          )
        )
        setMessage({
          content: `Updated ${changedPerson.name}'s number`,
          action: 'update'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessage({
          content: `Information of ${person.name} has already been removed from server`,
          action: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        console.log(`the person '${person.name}' was already deleted from server`)
        setPersons(persons.filter(n => n.id !== person.id))
      })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => {
    try {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    } catch (error) {
      console.log('Undefined filter')
    }
  })

  const checkExistence = nameToCheck => {
    const filteredPersons = persons.filter(person => {
      return nameToCheck === person.name
    })
    return filteredPersons.length === 0
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
