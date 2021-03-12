import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './components/Header'
import Router from './router/Router'
import Login from './components/Login'
import Search from './components/search/Search'
import SearchResults from './components/search/SearchResults'
import SearchControl from './components/search/SearchControl'
import Register from './components/registration/Register'

const Main = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)

const App = () => {
  return (
    <>
      <Header />
      <Main />
      {/* <Login /> */}
      {/* <Search /> */}
      {/* <SearchResults /> */}
      {/* <SearchControl /> */}
      {/* <Register /> */}
      {/* <RegisterControl /> */}
    </>
  );
}

export default App;
