import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landing from './Pages/Landing'
import Sell from './Pages/Sell'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
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


      </Switch>
    </Router>
  );
}

export default App;
