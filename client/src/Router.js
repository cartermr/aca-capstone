import { Switch, Route } from 'react-router'
import { useContext } from 'react'

import { Context } from './context'

import Search from './components/Search'
import Results from './components/Results'

const Router = () => {
    const {
        searchParams, 
        setSearchParams,
        searchResults,
        setSearchResults
    } = useContext(Context)
    // console.log(setSearchParams)
    return (
        <Switch>
            <Route exact path='/'>
                <Search 
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                />
            </Route>
            <Route
                path='/results'
                render={props => <Results searchResults={searchResults} />} />
        </Switch>
    )
}

export default Router