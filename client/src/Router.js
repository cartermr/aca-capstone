import { Switch, Route, Redirect } from 'react-router'
import { useContext, useState } from 'react'

import { Context } from './context'

import Login from './components/Login'
import Search from './components/Search'
import Results from './components/Results'
import Registration from './components/Registration'
import NewUser from './components/NewUser'
import Dashboard from './components/dash/Dashboard'

const Router = () => {
    const [auth, setAuth] = useState(false)
    const [isVerify, setIsVerify] = useState(true)

    const { state } = useContext(Context)

    // console.log(state)

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
                state={state}
                component={Search}
            />
            <Route
                path='/results'
                render={props => <Results searchResults={state.searchResults} />}
            />
            <Route
                path='/newuser'
                component={NewUser}
            />
            <Route path='/registration' component={Registration} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
    )
}

export default Router