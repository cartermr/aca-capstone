import { Switch, Route, Redirect } from 'react-router'
import { useContext } from 'react'

import { Context } from './context'

import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import Registration from './components/Registration'

const checkAuth = () => false

const ProtectedRoute = ( { component: Component, ...rest } ) => {
    return (
        <Route {...rest}>
            { checkAuth() ? <Component {...rest} /> : <Redirect to='/' />}
        </Route>
    )
}

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
            <Route
                exact
                path='/'
                render={() => <Login />}
            />
            <ProtectedRoute
                path='/search'
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                component={Search}
            />
            <Route
                path='/results'
                render={props => <Results searchResults={searchResults} />}
            />
            <Route path='/registration' component={Registration} />
        </Switch>
    )
}

export default Router