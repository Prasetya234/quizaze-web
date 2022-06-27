import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { React, useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

import Home from "./pages/home/Index"
import Stars from "./components/stars/Index"

import { setProfile } from './app/feature/connectSlice';
import { getApi } from "./app/fetchApi/connect"
import { useDispatch } from 'react-redux';

axios.interceptors.response.use(undefined, async (err) => {
  console.log(err);
  if (err.response.status == 401) {
    await Swal.fire({
      text: 'Your session has expired. Please reload the page or click the button',
      confirmButtonText: "Reload",
      icon: 'info'
    })
    window.location.reload()
  }
  return Promise.reject(err)
})

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const fetchUserAuth = async () => {
    setLoading(true)
    const storage = JSON.parse(localStorage.getItem('auth'))
    const res = await getApi(storage ? storage.user.id : '')
    dispatch(setProfile(res.user))
    setLoading(false)
  }
  useEffect(() => {
    fetchUserAuth()
  }, [])
  return (
    <div>
      <Stars />
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path={["/", "/home"]}>
                <Home loading={loading} fetchUserAuth={fetchUserAuth} />
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

