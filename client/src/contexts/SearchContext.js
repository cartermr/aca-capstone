import React, {useState, createContext} from 'react'
import Login from '../components/Login'

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [searchParameters, setSearchParameters] = useState({})
    const [searchResults, setSearchResults] = useState([])
    const [componentDisplayed, setComponentDisplayed] = useState(<Login />)

    return (
        <SearchContext.Provider value={{componentDisplayed, searchParameters, searchResults, setComponentDisplayed, setSearchParameters, setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}