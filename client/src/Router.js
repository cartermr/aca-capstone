import { Switch, Route, Redirect } from 'react-router'
import { useContext, useState } from 'react'

import { Context } from './context'

import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import Registration from './components/Registration'

const Router = () => {
    const [auth, setAuth] = useState(false)
    const [isVerify, setIsVerify] = useState(true)
    const {
        searchParams, 
        setSearchParams,
        searchResults,
        setSearchResults
    } = useContext(Context)
    // console.log(setSearchParams)

    const checkAuth = () => {
        return fetch('/api/authenticate', {method: 'POST'})
            .then(res => {
                res.ok ? setAuth(true) : setAuth(false)
                setIsVerify(false)
                return
            })
    }
    
    const ProtectedRoute = ( { component: Component, ...rest } ) => {
        checkAuth()
        return (
            !isVerify ?
                <Route {...rest}>
                    { auth ? <Component {...rest} /> : <Redirect to='/' />}
                </Route>
                : null            
        )
    }

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