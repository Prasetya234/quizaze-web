/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button, OverlayTrigger, Tooltip, Spinner, Form, InputGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { imageCharacter } from '../../util/generateImage';
import { play, readyAnswer } from '../../util/generateMusic';
import { playm } from '../../app/feature/soundSlice';
import ButtonLogin from '../../components/button/Index';
import { setProfile } from '../../app/feature/connectSlice';
import {
  getApi, updateProfile, findSchool, updateUserSchool,
  searchMateriUser, selectSchoolRandom, postAdminLogin,
} from '../../app/fetchApi/connect';

import { storage } from '../../firebase';

import Swal from 'sweetalert2';
import Loading from '../../components/loading/Index';
import Music from '../../components/music-player/Index';
import Modal from '../../components/modal/Modal';

import './index.scss';

function Index() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { isPlayed } = useSelector((state) => state.sound);
  const { profile } = useSelector((state) => state.connect);

  const [image, setImage] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [resFailLogin, setResFailLogin] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalMateri, setModalMateri] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [changeSchool, setChangeSchool] = useState(false);

  const [profileEdit, setProfileEdit] = useState(false);
  const [profileEditData, setProfileEditData] = useState({ avatar: '', username: '', email: '' });

  const [listMateri, setListMateri] = useState([]);
  const [listSchool, setListSchool] = useState([]);

  const wa = () => {
    play();
    window.open('https://api.whatsapp.com/send?phone=089504731540&text=Hallo%20kak%20saya%20ingin%20bergabung%20di%20Quizaze.%20supaya%20pembelajaran%20di%20sekolah%20kami%20jadi%20lebih%menyengakan');
  };
  const aktivSuara = () => {
    play();
    dispatch(playm({ play: !isPlayed }));
  };
  const funcSetModalActive = () => {
    play();
    setModalActive(!modalActive);
    if (!modalActive) findSchoolByInput();
    else {
      if (changeSchool) {
        setModalActive(false);
        setChangeSchool(false);
        setModalProfile(true);
      }
    }
  };
  const funcSetModalProfileActive = () => {
    play();
    setModalProfile(!modalProfile);
    setProfileEdit(false)
  };
  const changeImage = () => {
    if (profileEdit) {
      document.getElementById('file-input').click();
    }
  };
  const fetchUserAuth = async () => {
    setLoading(true);
    const datauser = JSON.parse(localStorage.getItem('auth'));
    const res = await getApi(datauser ? datauser.user.id : '');
    setLoading(false);
    if (!res) return;
    if (!datauser ? '' : datauser.user.roles.find((item) => item === 'ADMIN_SCHOOL' || item === 'ADMIN')) {
      navigator('/admin')
      return;
    }
    dispatch(setProfile(res.user));
    setTimeout(() => {
      checkingAlreadyQuestion()
    }, 2000);
  };
  const checkingAlreadyQuestion = async () => {
    const local = JSON.parse(localStorage.getItem('question-now'))
    if (!local) {
      return
    }
    const res = await Swal.fire({
      text: `Sepertinya kamu masih mengikuti quiz ${local.materi}, kalau kamu tidak melanjutkan kamu tidak bisa mengerjakan quiz ${local.materi} lagi dan nilai kamu akan terkirim`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Berhenti',
      confirmButtonText: 'Lanjutin'
    })
    if (!res.isConfirmed) {
      localStorage.removeItem('num')
      localStorage.removeItem('question-now')
      return
    }
    navigator("/question/" + local.id)
  }
  const onFileChange = async (event) => {
    const file = await event.target.files[0];
    setImageUpload(file);
    const base64 = await convertBase64(file);
    setImage(base64);
  };
  const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  const saveProfileUser = async () => {
    if (!profileEditData.username) {
      alert('Username ga boleh kosong');
      return;
    }
    setIsLoading(true);
    let urlResponse;
    if (imageUpload) {
      const imageRef = ref(storage, `images/${`${imageUpload.name}_${profile.username}`}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      urlResponse = url;
    }
    await updateProfile({
      avatar: imageUpload ? urlResponse : profile.avatar ? profile.avatar : '',
      email: profileEditData.email,
      username: profileEditData.username,
    });
    setIsLoading(false);
    setImageUpload(null);
    fetchUserAuth();
    setProfileEdit(false);
  };
  const findSchoolByInput = async (school) => {
    setListSchool([]);
    setIsLoading(true);
    const res = await findSchool({
      school: school || '',
    });
    setIsLoading(false);
    if (!res) return;
    setListSchool(res);
  };
  const selectRandomSchool = async () => {
    play();
    setLoading(true);
    const res = await selectSchoolRandom();
    setLoading(false);
    if (!res) return;
    fetchUserAuth()
    setModalActive(false);
    if (changeSchool) {
      setChangeSchool(false);
      setModalProfile(true);
    } else {
      setModalMateri(true);
    }
  };
  const onSelectSchool = async (e) => {
    play();
    const res = await updateUserSchool(e);
    setLoading(false);
    if (!res) return;
    fetchUserAuth();
    setModalActive(false);
    if (changeSchool) {
      setChangeSchool(false);
      setModalProfile(true);
    } else {
      setModalMateri(true);
    }
  };
  const onEditProfile = () => {
    play();
    if (profileEdit) { saveProfileUser(); return; }
    setProfileEdit(true);
    setProfileEditData({ username: profile.username, email: profile.email ? profile.email : '', avatar: profile.avatar });
    setImage(profile.avatar);
  };
  const findMateriByInput = async (val) => {
    setIsLoading(true);
    setListMateri([]);
    const res = await searchMateriUser({ materi: val || '' });
    setIsLoading(false);
    if (!res) return;
    setListMateri(res);
  };
  const closeModalLogin = () => {
    play();
    setModalLogin(false);
    setResFailLogin(false)
  };
  const loginAdmin = async (payload) => {
    setLoading(true);
    const res = await postAdminLogin(payload);
    if (!res) {
      setResFailLogin(true);
    } else {
      localStorage.setItem('auth', JSON.stringify(res))
      navigator('/admin');
    }
    setLoading(false);
  };
  const playButton = () => {
    play();
    if (profile.school) {
      setModalMateri(true);
      findMateriByInput();
    } else {
      funcSetModalActive();
    }
  };
  const settingProvacy = () => {
    localStorage.setItem('privacy', true);
    setPrivacy(true);
  };
  const authenticateTeams = () => {
    const priv = localStorage.getItem('privacy');
    setPrivacy(priv ? true : false);
  };
  const onChangeSchool = () => {
    setChangeSchool(true);
    setModalProfile(false);
    play();
    funcSetModalActive();
  };
  useEffect(() => {

    authenticateTeams();
    fetchUserAuth();
  }, []);
  return (
    <div
      style={{
        width: '100%', marginTop: '-10px', display: 'flex', justifyContent: 'center',
      }}
      id="music"
    >
      {loading && <Loading />}
      <Music played={isPlayed} />
      <Modal title="Pilih materi untuk memulai quiz" close={() => { play(); setModalMateri(false); }} active={modalMateri}>
        <MateriSelect
          findMateriByInput={findMateriByInput}
          listMateri={listMateri}
          isLoading={isLoading}
        />
      </Modal>
      <Modal title="" close={closeModalLogin} active={modalLogin} height="auto">
        <LoginAdminPage
          loginAdmin={loginAdmin}
          privacy={privacy}
          settingProvacy={settingProvacy}
          failLog={resFailLogin}
        />
      </Modal>
      <Modal title="Daftar Sekolah" close={funcSetModalActive} active={modalActive} width="550px" height="480px">
        {!privacy ? (
          <Form.Group className="mb-3 agree-privacy">
            <Form.Check
              required
              label="Agree to terms and conditions"
              onClick={settingProvacy}
            />
          </Form.Group>
        ) : (
          <div className="school-modal">
            <div className="school-modal-content">
              <Form.Control type="text" placeholder="Cari sekolahmu" onChange={(e) => findSchoolByInput(e.target.value)} />
              <div className="school-modal-list_school">
                {listSchool.map((e, i) => (
                  <div
                    className="daftar-school"
                    key={i}
                    onClick={() => { e.alreadyAnswer ? '' : onSelectSchool(e.id); }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p><b>{e.name}</b></p>
                      {!e.alreadyAnswer ? <p>{i + 1}</p> : <p style={{ fontWeight: 'bold', color: 'black' }}>Sudah di jawab</p>}
                    </div>
                    <p style={{ marginBottom: '5px' }}>{e.address}</p>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ textAlign: 'center', marginTop: '20px', height: '100px' }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
                {!listSchool.length && !isLoading && <p className="not-school">Sekolah tidak tersedia</p>}
              </div>
              {listSchool.length ? <p className="random" onClick={selectRandomSchool}>Pilih sekolah acak</p> : ''}
            </div>
          </div>
        )}
      </Modal>
      <Modal title="" close={funcSetModalProfileActive} active={modalProfile} height="350px">
        {isLoading ? (
          <div style={{
            top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)',
          }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : ''}

        <div className="profile-modal">
          <div className="profile-modal-left">
            <input id="file-input" type="file" accept="image/jpeg, image/png" style={{ display: 'none' }} onChange={(e) => onFileChange(e)} />
            {profileEdit ? (
              <img src={image || imageCharacter(profile.username)} alt="Profile" className="profile-modal-image opacity" onClick={changeImage} id="image" />
            ) : (<img src={profile.avatar ? profile.avatar : imageCharacter(profile.username)} alt="Profile" className="profile-modal-image" />)}
          </div>
          <div className="profile-modal-right">
            {!profileEdit ? (
              <div>
                <p>{profile.username}</p>
                <p style={{ color: profile.email ? '' : 'red' }}>{profile.email ? profile.email : 'Belum mengisi email'}</p>
                <p style={{ color: profile.school ? '' : 'red' }}>{profile.school ? profile.school.name : 'Belum memilih sekolah'}</p>
              </div>
            ) : (
              <div>
                <input type="text" placeholder="Username" autoFocus value={profileEditData.username} onChange={((e) => setProfileEditData({ ...profileEditData, username: e.target.value }))} />
                <input type="text" placeholder="Email" autoFocus value={profileEditData.email} onChange={((e) => setProfileEditData({ ...profileEditData, email: e.target.value }))} />
                <p style={{ fontSize: '15px', marginTop: '10px' }}>
                  {profile.school ? profile.school.name : 'Belum memilih sekolah'}
                  {' '}
                  &nbsp;
                  <span className="profile-modal-edit" onClick={onChangeSchool}>{profile.school ? 'Ganti Sekolah' : 'Pilih Sekolah'}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="profile-modal-id">
          <p>{profile.id}</p>
          <p className="profile-modal-edit" onClick={onEditProfile}>{profileEdit ? 'Simpan perubahan' : 'Edit profile'}</p>
        </div>
      </Modal>
      <div className="header">
        <div style={{ cursor: 'pointer' }} onClick={aktivSuara}>
          {
            isPlayed
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                  <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
                </svg>
              )
              : (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
                </svg>
              )
          }
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            overlay={(
              <Tooltip id="tooltipleft">
                Profile
                {' '}
                {profile.username}
              </Tooltip>
            )}
          >
            <img src={profile.avatar ? profile.avatar : imageCharacter(profile.username)} alt="Profile" className="profile" onClick={funcSetModalProfileActive} />
          </OverlayTrigger>
        </div>
      </div>
      <div className="App-content">
        <h2>Quizaze</h2>
        <p>
          Selamat datang di permainan Quizaze.
          ini adalah Website yang menyediakan quiz bagi pengguna
          <br />
          Mulai bermain!
        </p>
        <br />
        <ButtonLogin title="Main sekarang" action={playButton} />
      </div>
      <div className="footer">
        <p onClick={() => { play(); setModalLogin(true); }}>Admin Login</p>
        <p onClick={wa}>Join partner school</p>
      </div>
    </div>
  );
}

function MateriSelect({ isLoading, findMateriByInput, listMateri }) {
  const navigator = useNavigate();
  const onSelectMateri = async (item) => {
    play();
    const res = await Swal.fire({
      title: `Materi ${item.materi}`,
      text: `${item.description}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancle',
      confirmButtonText: 'Mulai'
    })
    if (!res.isConfirmed) {
      return
    }
    readyAnswer()
    setTimeout(() => {
      navigator(`/question/${item.id}`);
    }, 2500);
  };
  const onShowScore = (item) => {
    play()
    navigator(`/user-score/${item.id}`);
  }
  return (
    <div className="school-modal">
      <div className="school-modal-content">
        <Form.Control type="text" placeholder="Cari nama materi" onChange={(e) => findMateriByInput(e.target.value)} />
        <div className="school-modal-list_school">
          {listMateri.map((e, i) => (
            <div className="daftar-school" key={i} onClick={() => e.alreadyAnswer ? onShowScore(e) : onSelectMateri(e)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p><b>{e.materi}</b></p>
                {e.alreadyAnswer ? (<p style={{ color: 'black' }}>Sudah menjawab</p>) : (<p>
                  Total soal:
                  {e.questionTotal}
                </p>)}
              </div>
              <p style={{ marginBottom: '5px' }}>
                Guru:
                {e.teacher}
              </p>
            </div>
          ))}
          {isLoading && (
            <div style={{ textAlign: 'center', marginTop: '20px', height: '100px' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {!listMateri.length && !isLoading && <p className="not-school">Materi tidak tersedia</p>}
        </div>
      </div>
    </div>
  );
}

function LoginAdminPage({
  loginAdmin, privacy, settingProvacy, failLog,
}) {
  const [validate, setValidate] = useState(false);
  const [fromLoginUsername, setFromLoginUsername] = useState('');
  const [fromLoginPassword, setFromLoginPassword] = useState('');
  const checkingLogin = (e) => {
    e.preventDefault();
    if (!fromLoginUsername || !fromLoginPassword) {
      setValidate(true);
      return;
    }
    loginAdmin({ username: fromLoginUsername, password: fromLoginPassword });
  };
  return (
    <div className="login">
      <p className="title">Login Admin</p>
      <Form noValidate validated={validate} className="form" onSubmit={checkingLogin}>
        {failLog && <p className="fail-login">Username atau Password salah</p>}

        <Form.Group controlId="validationCustomUsername" style={{ marginBottom: '10px', width: '100%' }}>
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              required
              value={fromLoginUsername}
              onChange={(e) => setFromLoginUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Username harus di isi
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="validationCustomPassword" style={{ width: '100%' }}>
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
              value={fromLoginPassword}
              onChange={(e) => setFromLoginPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Paassword harus di isi
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {!privacy && (
          <Form.Group className="mb-3" style={{ width: '100%', fontSize: '18px' }}>
            <Form.Check
              required
              label="Agree to terms and conditions"
              onClick={settingProvacy}
            />
          </Form.Group>
        )}

        <Button type="submit" style={{ textAlign: 'center' }}>Masuk</Button>
      </Form>
    </div>
  );
}

export default Index;
