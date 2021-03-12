import React, { useState } from 'react'
import {Switch, Route, Redirect} from 'react-router'
import axios from 'axios'

import Login from '../components/Login'
import SearchControl from '../components/search/SearchControl'
import Register from '../components/registration/Register'


const Router = () => {
    const [User, setUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)

    const checkAuth = async () => {
        let result = await axios.post('/api/authenticate').then(res => {
            console.log(res)
        })
        console.log(result)
        return result
    }

    
    const ProtectedRoute = ({component: Component, ...rest}) => {
        let loggedIn = checkAuth()
        console.log(loggedIn)
        return (
            <Route
            {...rest}
            render={(props) => loggedIn
                ? <Component {...props} />
                : <Redirect to='/' />}
            />
        )
    }

    const handleInput = (e) => {
        const key = e.target.name
        const value = e.target.value
        let user = User
        User[key] = value
        setUser(user)
        console.log(JSON.stringify(User))
    }

    const login =(e) => {
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST'
        })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    window.location.replace('/search')
                }
            })
      }

    return (
        <Switch>
            <Route
                exact
                path='/'
                render={(props) => (
                    <Login {...props} login={login} input={handleInput} />
                )} />
            <ProtectedRoute path='/search' component={SearchControl} />
            <Route path='/register' component={Register} />
        </Switch>
    )
}

export default Router