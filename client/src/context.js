import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useState({})
    const [searchResults, setSearchResults] = useState([])

    // let state = {
    //     searchParams: searchParams,
    //     setSearchParams: setSearchParams,
    // }

    const state = {
        searchParams,
        setSearchParams,
        searchResults,
        setSearchResults
    }

    return (
        // <Context.Provider value={{searchParams, setSearchParams}}>
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}