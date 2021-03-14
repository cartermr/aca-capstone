import {Switch, Route} from 'react-router'

import Login from '../components/Login'
import Search from '../components/search/Search'
import Register from '../components/registration/Register'
import SearchResults from '../components/search/SearchResults'
import { useContext } from 'react'
import { SearchContext } from '../contexts/SearchContext'

const Router = () => {
    const {searchParameters, setSearchParameters} = useContext(SearchContext)

    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/search' component={Search} />
            <Route path='/results' component={SearchResults} />
            <Route path='/register' component={Register} />
        </Switch>
    )
}

export default Router