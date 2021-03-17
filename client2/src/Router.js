import {Switch, Route} from 'react-router'

import Login from './components/Login'
import Search from './components/search/Search'
import Register from './components/registration/Register'
import SearchResults from './components/search/SearchResults'

import { useContext } from 'react'
import { ContextProvider } from './Context'
import { Context } from './Context'

const Router = () => {
    const {searchParameters} = useContext(Context)
    // console.log(test)
    return (
        <ContextProvider>
            <Switch>
                {/* <Route exact path='/' component={Login} /> */}
                <Route exact path='/' component={Search} />
                <Route path='/results' component={SearchResults} />
                <Route path='/register' component={Register} />
            </Switch>
        </ContextProvider>
    )
}

export default Router