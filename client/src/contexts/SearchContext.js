import React, {useState, createContext} from 'react'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [searchParameters, setSearchParameters] = useState({})
    const [searchResults, setSearchResults] = useState([])

    return (
        <SearchContext.Provider value={{searchParameters, searchResults, setSearchParameters, setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}