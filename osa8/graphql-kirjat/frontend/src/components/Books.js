import React, { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FILTER_BOOKS, ALL_GENRES } from '../queries/queries'

const Books = (props) => {
  const [getAllBooks, allBooks] = useLazyQuery(ALL_BOOKS)
  const [getFilteredBooks, filteredBooks] = useLazyQuery(FILTER_BOOKS)

  const [getAllGenres, allGenres] = useLazyQuery(ALL_GENRES)

  const [genreList, setGenreList] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    getAllBooks()
    getAllGenres()
  }, []) // eslint-disable-line 

  useEffect(() => {
    if (allBooks.data) {
      setBooks(allBooks.data.allBooks)
    }
  }, [allBooks]) // eslint-disable-line 

  const filterBooks = (genre) => {
    if(genre) {
      getFilteredBooks({ variables: { genre } })
    } else {
      getAllBooks()
    }
  }

  useEffect(() => {
    if(filteredBooks.data) {
      setBooks(filteredBooks.data.allBooks)
    }
  }, [filteredBooks]) // eslint-disable-line 

  useEffect(() => {
    if (allGenres.data) {
      let list = []
      allGenres.data.allBooks.forEach((b) => {
        b.genres.forEach((g) => {
          if (!list.includes(g)) {
            list.push(g)
          }
        })
      })
      setGenreList(list)
    }
  }, [allGenres]) // eslint-disable-line 

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genreList.map((g) => (
          <button
            name={g}
            key={g}
            onClick={(e) => filterBooks(e.target.name)}
          >
            {g}
          </button>
        ))}

        <button onClick={() => filterBooks(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
