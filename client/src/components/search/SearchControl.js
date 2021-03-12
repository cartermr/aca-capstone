import { useState } from 'react'

import Search from './Search'
import SearchResults from './SearchResults'
import Results from './SearchResults'

const SearchControl = () => {
    // control the input values, create searchParameters object
    const [searchParameters, setSearchParameters] = useState({})
    const handleInput = (e) => {
        let key = e.target.name
        let value = e.target.value
        let params = searchParameters
        params[key] = value
        setSearchParameters(params)
        console.log('searchParams = ' + JSON.stringify(searchParameters))
    }

    const performSearch = () => {
        fetch('/api/search', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchParameters)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentDisplay(<SearchResults people={data} />)
            })
    }

    // determine if the search screen or the results screen will display
    const [CurrentDisplay, setCurrentDisplay] = useState(<Search onChange={handleInput} performSearch={performSearch} />)

    return CurrentDisplay
}

export default SearchControl