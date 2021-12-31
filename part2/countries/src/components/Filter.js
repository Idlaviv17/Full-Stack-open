import React from 'react'

const Filter = (props) => {
    return (
        <form>
            <label>find countries </label>
            <input
                value={props.filter}
                onChange={props.handleFilterChange} />
        </form>
    )
}

export default Filter
