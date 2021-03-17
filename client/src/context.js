import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useState({})
    let test = {
        searchParams: searchParams,
        setSearchParams: setSearchParams,
    }
    return (
        // <Context.Provider value={{searchParams, setSearchParams}}>
        <Context.Provider value={test}>
            {children}
        </Context.Provider>
    )
}