import { BrowserRouter } from 'react-router-dom'

import Header from './components/siteWide/Header'
import Router from './Router'

import { ContextProvider } from './context'

const Main = () => (
  <BrowserRouter>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </BrowserRouter>
)

function App() {
  return (
    <div>
        <Header />
        <Main />
    </div>
  );
}

export default App;
