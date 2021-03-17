import { Switch, Route } from 'react-router'
import { useContext } from 'react'

import Search from './components/Search'
import { Context, ContextProvider } from './context'

const Router = () => {
    const {searchParams, setSearchParams} = useContext(Context)
    console.log(searchParams)
    return (
        <Switch>
            <Route exact path='/'>
                <Search searchParams={searchParams} setSearchParams={() => setSearchParams()} />
            </Route>
        </Switch>
    )
}

export default Router