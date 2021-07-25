import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const onFilterChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <>
      <p>
        filter <input onChange={onFilterChange} />
      </p>
    </>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
