import './styles/tailwind.output.css'
import './styles/custom.css'
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Login from './components/Login';
import Search from './components/Search';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);
  const [airlines, setAirlines] = useState([]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const getConfigFromApi = async () => {
      const response = await axios('http://localhost/api/config', {withCredentials: true});

      // Airlines
      if (response.data.airlines) {
        setAirlines(response.data.airlines)
      }

      // User
      if (response.data.user) {
        setUser(response.data.user)
      }

      setLoading(false);
    };
 
    getConfigFromApi();
  }, []);

  return (
    <Router>
      <Header user={ user } setLoading={ setLoading } setUser={ setUser } />
      {loading ? <Loader /> :
        <Switch>
          <Route path="/search">
            {!user ? <Redirect to="/" /> : <Search />}
          </Route>
          <Route path="/">
            {user ? <Redirect to="/search" /> : <Login airlines={ airlines } setUser={ setUser } />}
          </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;