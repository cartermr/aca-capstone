import { BrowserRouter } from 'react-router-dom'

import Header from './components/siteWide/Header'
import Router from './Router'

const Main = () => (
  <BrowserRouter>
    <Router />
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
