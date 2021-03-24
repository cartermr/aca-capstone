// Module imports
import { Switch, Route, Redirect } from 'react-router'
import { useContext, useState } from 'react'

// Import context to pass site wide state
import { Context } from './context'

// Sitewide Components
import Portal from './components/siteWide/Portal'

// Internal Componenets
import Login from './components/internal/Login'
import Search from './components/internal/Search'
import Results from './components/internal/Results'
import NewAgencyUser from './components/internal/NewAgencyUser'

// Public Components
import Registration from './components/public/Registration'
import Dashboard from './components/public/Dashboard'

// React Router function
const Router = () => {
    // Local boolean state to determine if authorized while switching to protected routes
    const [auth, setAuth] = useState(false)
    // Local boolean to determine if verification has finished or not
    const [isVerify, setIsVerify] = useState(true)

    // Site wide state
    const { state } = useContext(Context)

    // console.log(state)

    // Authorization function that runs when accessing protected routes
    const checkAuth = () => {
        return fetch('/api/authenticate', {method: 'POST'})
            .then(res => {
                res.ok ? setAuth(true) : setAuth(false)
                setIsVerify(false)
                return
            })
    }
    
    // React Router, Protected Route element that controls what the User sees based on authorization
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
                component={Login}
            />
            <ProtectedRoute
                path='/internal/search'
                state={state}
                component={Search}
            />
            <ProtectedRoute
                path='/internal/results'
                searchResults={state.searchResults}
                component={Results}
            />
            <Route
                path='/internal/newuser'
                component={NewAgencyUser}
            />
            <Route path='/public/registration' component={Registration} />
            <Route path='/public/dashboard' component={Dashboard} />
        </Switch>
    )
}

export default Router