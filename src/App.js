import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { React, useEffect, useState } from 'react';

import Loading from "./components/loading/Index"
import Modal from "./components/modal/Index"
import Home from "./pages/home/Index"
import Stars from "./components/stars/Index"

import { getApi } from "./app/fetchApi/connect"


const App = () => {
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false)

  const funcSetModalActive = () => {
    setModalActive(true)
  }

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('auth'))
    getApi(storage ? storage.user.id : '')
  }, [])
  return (
    <div>
      <Stars />
      <div className="App">
        <Modal show={modalActive} handleClose={() => setModalActive(false)} handleSubmit={funcSetModalActive} />
        {loading ? <Loading /> : ''}
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path={["/", "/home"]}>
                <Home funcSetModal={funcSetModalActive} />
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

