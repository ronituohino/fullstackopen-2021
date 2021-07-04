import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Fetch persons data from db.json with axios
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((persons) => {
        console.log(persons.data)
        setPersons(persons.data)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()

    // Check if person is already in numbers
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      // If not, create new person
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(newPerson))
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Phonebook handleFilterChange={handleFilterChange} />

      <Add
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}

        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers persons={persons} filter={filter} />
    </div>
  )

}

const Phonebook = (props) => {
  return (
    <>
      <h2>Phonebook</h2>
      <p>filter shown with
        <input onChange={props.handleFilterChange} />
      </p>
    </>
  )
}

const Add = (props) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={props.addNewName}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>

        <div>
          number: <input
            number={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Numbers = ({ persons, filter }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person =>
        filter === ''
          ? <Person key={person.name} name={person.name} number={person.number} />
          : person.name.toLowerCase().includes(filter.toLowerCase())
            ? <Person key={person.name} name={person.name} number={person.number} />
            : ''
      )}
    </>
  )
}

const Person = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

export default App