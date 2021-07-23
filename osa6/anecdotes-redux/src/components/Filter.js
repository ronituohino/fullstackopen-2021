import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const onFilterChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <>
            <p>filter <input onChange={onFilterChange} /></p>
        </>
    )
}

export default Filter