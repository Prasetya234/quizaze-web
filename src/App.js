import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import google from "./assets/icon/google.jpeg"
import react from "./assets/icon/react.png"

import Loading from './components/loading/Index';
import Home from "./pages/home/Index"
import Question from "./pages/question/Index"
import Stars from "./components/stars/Index"
import NotFound from "./pages/404/Index"
import Modal from "./components/modal/Modal"

import { play } from './util/generateMusic';
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
  const [modalAbout, setModalAbout] = useState(false)
  const dispatch = useDispatch()

  const fetchUserAuth = async () => {
    setLoading(true)
    const storage = JSON.parse(localStorage.getItem('auth'))
    const res = await getApi(storage ? storage.user.id : '')
    setLoading(false)
    if (!res) return
    dispatch(setProfile(res.user))
  }
  useEffect(() => {
    fetchUserAuth()
  }, [])
  return (
    <div>
      <Stars />
      <Modal title="Tentang kami" active={modalAbout} close={() => { play(); setModalAbout(false) }} height="auto">
        <div className='copyright-modal'>
          <h1>Sponsor By </h1>

          <div className="copyright-modal-sponsor">
            <div>
              <img src={google} />
            </div>
            <div>
              <img src={react} />
            </div>
          </div>
          <p style={{ fontWeight: "bold", marginBottom: "0px", fontSize: "20px" }}>Tujuan :</p>
          <p>Quizaze adalah website yang menyediakan soal yang menarik untuk kamu yang suka malas-malasan untuk mengerhakan tugas sekolah</p>
          <p style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "20px" }}>Developer</p>
          <p><span onClick={() => window.open("https://www.instagram.com/xzy_prasetya/")}>Prasetya Dhany Putra</span> <b>(Leader & developer quizaze)</b></p>
        </div>
      </Modal >
      {loading && <Loading />}
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home fetchUserAuth={fetchUserAuth} />} />
              <Route path="/question/:id" element={<Question />} />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </header>
        <p className="copyright" onClick={() => { play(); setModalAbout(true) }}>&copy;Copyright {new Date().getFullYear()}</p>
      </div>
    </div >
  );
}

export default App;

