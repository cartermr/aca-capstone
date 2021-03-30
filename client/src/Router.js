// Module imports
import { Switch, Route, Redirect } from 'react-router'
import { useState } from 'react'

// Sitewide Components
import Portal from './components/siteWide/Portal'

// Internal Componenets
import InternalLogin from './components/internal/Login'
import Search from './components/internal/Search'
import Results from './components/internal/Results'
import NewAgencyUser from './components/internal/NewAgencyUser'

// Public Components
import PublicLogin from './components/public/Login'
import Registration from './components/public/Registration'
import Dashboard from './components/public/Dashboard'
import NewPublicUser from './components/public/newPublicUser'

// React Router function
const Router = () => {
    const [auth, setAuth] = useState(false)
    const [isVerify, setIsVerify] = useState(true)

    const [searchParams, setSearchParams] = useState({})
    const [searchResults, setSearchResults] = useState([])
    const searchState = {
        searchParams,
        setSearchParams,
        searchResults,
        setSearchResults
    }

    // Authorization function that runs when accessing protected routes
    const checkAuth = () => {
        return fetch('/api/authenticate', {method: 'POST'})
            .then(res => {
                if (res.ok) {
                    setAuth(true)
                } else {
                    setAuth(false)
                    sessionStorage.clear()
                }
                setIsVerify(false)
            })
    }
    
    // React Router, Protected Internal Route element that controls what the User sees based on authorization
    const ProtectedInternaleRoute = ( { component: Component, ...rest } ) => {
        checkAuth()
        return (
            !isVerify ?
                <Route {...rest}>
                    { auth && sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))['role'] === 'search' ? <Component {...rest} /> : <Redirect to='/' />}
                </Route>
                : null            
        )
    }

    // React Router, Protected Public Route element that controls what the User sees based on authorization
    const ProtectedPublicRoute = ( { component: Component, ...rest } ) => {
        checkAuth()
        return (
            !isVerify ?
                <Route {...rest}>
                    { auth && sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))['role'] === 'register' ? <Component {...rest} /> : <Redirect to='/' />}
                </Route>
                : null            
        )
    }

    // The actual router code, display certain components based on URL route
    return (
        <Switch>
             <Route
                exact
                path='/'
                component={Portal}
            />
            <Route
                path='/internal/login'
                component={InternalLogin}
            />

            {/* Agency User Routes */}
            <ProtectedInternaleRoute
                path='/internal/search'
                state={searchState}
                component={Search}
            />
            <ProtectedInternaleRoute
                path='/internal/results'
                searchResults={searchState.searchResults}
                component={Results}
            />
            <Route
                path='/internal/newuser'
                component={NewAgencyUser}
            />

            {/* Public User Routes */}
            <Route
                path='/public/login'
                component={PublicLogin}
            />
            <ProtectedPublicRoute
                path='/public/registration'
                component={Registration}
            />
            <ProtectedPublicRoute
                path='/public/dashboard'
                component={Dashboard}
            />
            <Route
                path='/public/newuser'
                component={NewPublicUser}
            />
        </Switch>
    )
}

export default Router