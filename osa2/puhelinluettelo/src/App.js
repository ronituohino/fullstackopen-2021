import React, { useState, useEffect } from 'react'
import numbersService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [notification, setNotification] = useState({ message: '', error: false })

  // Fetch persons data from db.json with axios
  useEffect(() => {
    numbersService.all()
      .then(result => setPersons(result))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const existing = persons.find(p => p.name === newName)

    // Check if person is already in numbers
    if (typeof existing !== 'undefined') {
      // Ask if we replace the contact number
      if (window.confirm(
        `${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
        numbersService.replace(existing.id, newPerson)
          .then(data => {
            setPersons(persons.map(p =>
              p.id === data.id
                ? data
                : p
            ))

            showNotification(`Replaced ${newName}'s number with ${newNumber}`, false)
          })
          .catch(error => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              true
            )
          })
      }
    }
    else {
      // If not, create new person
      numbersService.create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))

          showNotification(`Added ${newPerson.name}`, false)
        })
    }
  }

  const deleteExistingNumber = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      numbersService.del(person.id)
        .then(data => {
          setPersons(persons.filter(p =>
            p.id !== person.id
          ))

          showNotification(`Removed ${person.name}`, false)
        })
    }
  }

  const showNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification({ message: '', error: false })
    }, 3000)
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

      <Notification notification={notification} />

      <Add
        addNewName={addNewPerson}

        newName={newName}
        handleNameChange={handleNameChange}

        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Numbers
        persons={persons}
        filter={filter}
        deleteCallback={deleteExistingNumber}
      />
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

const Numbers = ({ persons, filter, deleteCallback }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person =>
        filter === ''
          ? <Person
            key={person.name}
            person={person}
            deleteCallback={deleteCallback}
          />
          : person.name.toLowerCase().includes(filter.toLowerCase())
            ? <Person
              key={person.name}
              person={person}
              deleteCallback={deleteCallback}
            />
            : ''
      )}
    </>
  )
}

const Person = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
      <button onClick={() => props.deleteCallback(props.person)}>delete</button>
    </p>
  )
}

const Notification = ({ notification }) => {
  const notificationStyle = {
    color: notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification.message === '') {
    return ''
  }
  else {
    return (
      <div style={notificationStyle}>
        {notification.message}
      </div>
    )
  }
}

export default App