import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from "./components/loading/Index"
import Modal from "./components/modal/Index"
import NotAuth from "./pages/home/Index"
import IsAuth from "./pages/question/Index"
import Stars from "./components/stars/Index"
import { play, stop } from "./util/generateMusic"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';


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
    stop()
    setIsLoggind(true)
  }
  const funcSetModalActive = () => {
    setModalActive(true)
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      play()
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
              <Route exact path="/">
                <NotAuth funcSetModal={funcSetModalActive} />
              </Route>
            </Switch>
          </Router>

        </header>
        <p className="copyright">&copy;Copyright {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default App;
