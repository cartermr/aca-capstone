import { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [searchParameters, setSearchParameters] = useState({test: "test"})

    return (
        <Context.Provider value={{searchParameters}}>
            {children}
        </Context.Provider>
    )
}