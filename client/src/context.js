import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [searchParams, setSearchParams] = useState({})
    return (
        <Context.Provider value={{searchParams}}>
            {children}
        </Context.Provider>
    )
}