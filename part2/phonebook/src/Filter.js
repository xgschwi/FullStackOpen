import React from 'react'

const Filter = ({filter, setFilter}) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <form>
            <div>Filter shown with: <input value = {filter} onChange = {handleFilterChange}/></div>
        </form>
    )
}
export default Filter