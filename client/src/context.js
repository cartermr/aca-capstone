import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useState({})
    const [searchResults, setSearchResults] = useState([])

    const contextState = {
        state: {
            searchParams,
            setSearchParams,
            searchResults,
            setSearchResults
        }
    }

    return (
        <Context.Provider value={contextState}>
            {children}
        </Context.Provider>
    )
}