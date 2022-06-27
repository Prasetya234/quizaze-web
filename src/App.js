import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { React, useEffect, useState } from 'react';

import Loading from "./components/loading/Index"
import Home from "./pages/home/Index"
import Stars from "./components/stars/Index"

import { setProfile } from './app/feature/connectSlice';
import { getApi } from "./app/fetchApi/connect"
import { useDispatch } from 'react-redux';


const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()


  const fetchUserAuth = async () => {
    const storage = JSON.parse(localStorage.getItem('auth'))
    const res = await getApi(storage ? storage.user.id : '')
    dispatch(setProfile(res.user))
  }
  useEffect(() => {
    fetchUserAuth()
    document.querySelector("body").classList.add("overflow-hidden")
  }, [])
  return (
    <div>
      <Stars />
      <div className="App">
        {loading ? <Loading /> : ''}
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path={["/", "/home"]}>
                <Home />
              </Route>
              <Route>Page not found</Route>
            </Switch>
          </Router>
        </header>
        <p className="copyright">&copy;Copyright {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default App;

