import { useState } from 'react'

import Search from './Search'
import Results from './SearchResults'

const SearchControl = () => {
    // value to hold the results of the search
    const [searchResults, setSearchResults] = useState([])

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

    const performSearch = async () => {
        let response = await fetch('/api/search', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchParameters)
        })

        let result = await response.json()

        console.log(result)
    }

    // determine if the search screen or the results screen will display
    const [CurrentDisplay, SetCurrentDisplay] = useState(<Search onChange={handleInput} performSearch={performSearch} />)

    return CurrentDisplay
}

export default SearchControl