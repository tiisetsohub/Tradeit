import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landing from './Pages/Landing'
import Sell from './Pages/Sell'
import About from './Pages/About'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { NameContext, LoginContext } from './Context'
import { useState } from 'react'

function App() {
  
  const [name, setName] = useState("tiisetso")

  const [login, setLogin] = useState(false)
  return (
    <LoginContext.Provider value ={{login,setLogin}}>
      <NameContext.Provider value={{ name, setName }} >
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/landing">
              <Landing />
            </Route>

            <Route path="/sell">
              <Sell />
            </Route>

            <Route path="/about">
              <About />
            </Route>

          </Switch>
        </Router>

      </NameContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
