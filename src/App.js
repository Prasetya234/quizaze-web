import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from "./components/loading/Index"
import Modal from "./components/modal/Index"
import Home from "./pages/home/Index"
import Stars from "./components/stars/Index"


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { React, useEffect, useState } from 'react';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggind, setIsLoggind] = useState(false);
  const [modalActive, setModalActive] = useState(false)
  const afterAuth = (username) => {
    if (!username) {
      return
    }
    setModalActive(false)
    setLoading(true)
    sessionStorage.setItem('auth', JSON.stringify({ username: username, logdate: new Date(), isActive: true }))
    setTimeout(() => {
      authentication()
      setLoading(false)
    }, 4000);
  }
  const authentication = () => {
    if (!sessionStorage.getItem('auth')) return
    setIsLoggind(true)
  }
  const funcSetModalActive = () => {
    setModalActive(true)
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      authentication();
    }
    return () => { ignore = true; }
  }, []);
  return (
    <div>
      <Stars />

      <div className="App">
        <Modal show={modalActive} handleClose={() => setModalActive(false)} handleSubmit={afterAuth} />
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

