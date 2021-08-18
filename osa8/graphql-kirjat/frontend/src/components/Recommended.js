import React, { useEffect, useState } from 'react'
import { FAVORITE_GENRE, FILTER_BOOKS } from '../queries/queries'
import { useLazyQuery } from '@apollo/client'

const Recommended = (props) => {
  const [getFavorite, favorite] = useLazyQuery(FAVORITE_GENRE)
  const [getFilteredBooks, filteredBooks] = useLazyQuery(FILTER_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(props.token) {
      getFavorite()
    }
  }, [props.token])

  useEffect(() => {
    if(favorite.data && favorite.data.me) {
      getFilteredBooks({ variables: { genre: favorite.data.me.favoriteGenre } })
    }
  }, [favorite]) // eslint-disable-line 

  useEffect(() => {
    if(filteredBooks.data) {
      setBooks(filteredBooks.data.allBooks)
    }
  }, [filteredBooks])

  if (!props.show) {
    return <></>
  }

  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{' '}
        <b>{favorite.data.me ? favorite.data.me.favoriteGenre : <></>}</b>
      </p>

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
    </>
  )
}

export default Recommended
