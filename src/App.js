/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import google from './assets/icon/google.jpeg';
import react from './assets/icon/react.png';

import Congrats from './pages/congrats/Index'
import Home from './pages/home/Index';
import Admin from './pages/admin/Index';
import Question from './pages/question/Index';
import Stars from './components/stars/Index';
import NotFound from './pages/404/Index';
import Modal from './components/modal/Modal';

import { play } from './util/generateMusic';

axios.interceptors.response.use(undefined, async (err) => {
  if (err.response.status === 401) {
    await Swal.fire({
      text: 'Your session has expired. Please reload the page or click the button',
      confirmButtonText: 'Reload',
      icon: 'info',
    });
    window.location.reload();
  } else if (err.response.status === 0) {
    await Swal.fire({
      icon: 'warning',
      title: 'Offline for maintenance',
      text: 'Aplikasi ini sedang dilakukan maintenance. \n Mohon periksa kembali nanti.',
      confirmButtonText: 'Close',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
    window.open('', '_self').close();
  }
  return Promise.reject(err);
});

function App() {
  const [modalAbout, setModalAbout] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Stars />
      <Modal title="Tentang kami" active={modalAbout} close={() => { play(); setModalAbout(false); }} height="auto">
        <AbautMe />
      </Modal>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/question/:id" element={<Question />} />
              <Route path="/user-score/:id" element={<Congrats />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </header>
        <div className="copyright" onClick={() => { play(); setModalAbout(true); }}>
          &copy;Copyright
          {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}

function AbautMe() {
  return (
    <div className="copyright-modal">
      <h1>Sponsor By </h1>
      <div className="copyright-modal-sponsor">
        <div>
          <img src={google} alt="google" />
        </div>
        <div>
          <img src={react} alt="react" />
        </div>
      </div>
      <p style={{ fontWeight: 'bold', marginBottom: '0px', fontSize: '20px' }}>Tujuan :</p>
      <p>Quizaze adalah website yang menyediakan soal yang menarik untuk kamu yang suka malas-malasan untuk mengerhakan tugas sekolah</p>
      <p style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '20px' }}>Developer</p>
      <p>
        <span onClick={() => window.open('https://www.instagram.com/xzy_prasetya/')}>Prasetya Dhany Putra</span>
        {' '}
        <b>(Leader & developer quizaze)</b>
      </p>
    </div>
  );
}

export default App;
