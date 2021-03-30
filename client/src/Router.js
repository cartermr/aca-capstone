// Module imports
import { Switch, Route, Redirect } from 'react-router'
import { useContext, useState } from 'react'

// Import context to pass site wide state
import { Context } from './context'

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

// React Router function
const Router = () => {
    // Local boolean state to determine if authorized while switching to protected routes
    const [auth, setAuth] = useState(false)
    // Local boolean to determine if verification has finished or not
    const [isVerify, setIsVerify] = useState(true)
    const [type, setType] = useState('')

    // Site wide state
    const { state } = useContext(Context)

    // console.log(state)

    // Authorization function that runs when accessing protected routes
    const checkAuth = () => {
        return fetch('/api/authenticate', {method: 'POST'})
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setAuth(true)
                    setType(data.role)
                    state.setUser(data)
                } else {
                    setAuth(false)
                }
                setIsVerify(false)
                return
            })
    }
    
    // React Router, Protected Internal Route element that controls what the User sees based on authorization
    const ProtectedInternaleRoute = ( { component: Component, ...rest } ) => {
        checkAuth()
        return (
            !isVerify ?
                <Route {...rest}>
                    { auth && type === 'search' ? <Component {...rest} /> : <Redirect to='/' />}
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
                    { auth && type === 'register' ? <Component {...rest} /> : <Redirect to='/' />}
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
                // component={InternalLogin}
                render={(props) => <InternalLogin {...props} {...state} />}
            />
             <Route
                path='/public/login'
                render={(props) => <PublicLogin {...props} {...state} />}
            />
            <ProtectedInternaleRoute
                path='/internal/search'
                state={state}
                component={Search}
            />
            <ProtectedInternaleRoute
                path='/internal/results'
                searchResults={state.searchResults}
                component={Results}
            />
            <Route
                path='/internal/newuser'
                component={NewAgencyUser}
            />
            <ProtectedPublicRoute path='/public/registration' state={state} component={Registration} />
            <ProtectedPublicRoute path='/public/dashboard' state={state} component={Dashboard} />
        </Switch>
    )
}

export default Router