import React, { useState } from "react"
import { OverlayTrigger, Tooltip, Spinner } from "react-bootstrap"
import { imageCharacter } from "../../util/generateImage"
import { play } from "../../util/generateMusic"
import { useSelector, useDispatch } from "react-redux"
import { playm } from "../../app/feature/soundSlice"
import Button from "../../components/button/Index"
import { updateProfile } from "../../app/fetchApi/connect"

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";

import Loading from "../../components/loading/Index"
import Music from "../../components/music-player/Index"
import Modal from "../../components/modal/Modal"


import "./index.scss"

const Index = ({ loading, fetchUserAuth }) => {
  const dispatch = useDispatch()
  const { isPlayed } = useSelector((state) => state.sound)
  const { profile } = useSelector(state => state.connect)
  const [imageUpload, setImageUpload] = useState(null);
  const [modalActive, setModalActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modalProfile, setModalProfile] = useState(false)
  const [profileEdit, setProfileEdit] = useState(false)
  const [profileEditData, setProfileEditData] = useState({ avatar: '', username: '', email: '' })
  const [image, setImage] = useState("")
  const wa = () => {
    play()
    window.open("https://api.whatsapp.com/send?phone=089504731540&text=Hallo%20kak%20saya%20ingin%20bergabung%20di%20Quizaze.%20supaya%20pembelajaran%20di%20sekolah%20kami%20jadi%20lebih%20menyenagkan")
  }
  const aktivSuara = () => {
    play()
    dispatch(playm({ play: !isPlayed }))
  }
  const funcSetModalActive = () => {
    play()
    setModalActive(!modalActive)
  }
  const funcSetModalProfileActive = () => {
    play()
    setModalProfile(!modalProfile)
  }
  const changeImage = () => {
    if (profileEdit) {
      document.getElementById('file-input').click()
    }
  }
  const onFileChange = async (event) => {
    const file = await event.target.files[0]
    setImageUpload(file)
    const base64 = await convertBase64(file)
    setImage(base64)

  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  const saveProfileUser = async () => {
    setIsLoading(true)
    let urlResponse
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name + profile.username}`);
      const snapshot = await uploadBytes(imageRef, imageUpload)
      const url = await getDownloadURL(snapshot.ref);
      urlResponse = url
    }
    await updateProfile({
      avatar: imageUpload ? urlResponse : profile.avatar ? profile.avatar : "",
      email: profileEditData.email,
      username: profileEditData.username
    })
    setImageUpload(null)
    fetchUserAuth()
    setIsLoading(false)
    setProfileEdit(false)
  }
  const onEditProfile = () => {
    play()
    if (profileEdit) { saveProfileUser(); return }
    setProfileEdit(true)
    setProfileEditData({ username: profile.username, email: profile.email ? profile.email : "", avatar: profile.avatar });
    setImage(profile.avatar)
  }
  return (
    <div style={{ width: '100%', display: "flex", justifyContent: 'center' }} id="music">
      {loading ? <Loading /> : ''}
      <Music played={isPlayed} />
      <Modal title="Gabung sekolah kamu" close={funcSetModalActive} active={modalActive} >
        <h1>Sekolah</h1>
      </Modal>
      <Modal title="" close={funcSetModalProfileActive} active={modalProfile} >
        {isLoading ? (
          <div style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -50%)" }}>
            <Spinner animation="border" role="status" >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : ""}

        <div className="profile-modal">
          <div className="profile-modal-left">
            <input id="file-input" type="file" accept="image/jpeg, image/png" style={{ display: 'none' }} onChange={e => onFileChange(e)} />
            {profileEdit ? (
              <img src={image ? image : imageCharacter(profile.username)} alt="Profile" className='profile-modal-image opacity' onClick={changeImage} id="image" />
            ) : (<img src={profile.avatar ? profile.avatar : imageCharacter(profile.username)} alt="Profile" className='profile-modal-image' />)}
          </div>
          <div className="profile-modal-right">
            {!profileEdit ? (
              <div>
                <p>{profile.username}</p>
                <p style={{ color: profile.email ? '' : 'red' }}>{profile.email ? profile.email : "email kosong"}</p>
                <p style={{ color: profile.school ? '' : 'red' }}>{profile.school ? profile.school.name : "sekolah kosong"}</p>
              </div>
            ) : (
              <div>
                <input type="text" placeholder="Username" autoFocus value={profileEditData.username} onChange={(e => setProfileEditData({ ...profileEditData, username: e.target.value }))} />
                <input type="text" placeholder="Email" autoFocus value={profileEditData.email} onChange={(e => setProfileEditData({ ...profileEditData, email: e.target.value }))} />
                <input type="text" placeholder="School" autoFocus />
              </div>
            )}
          </div>
        </div>
        <div className="profile-modal-id">
          <p>{profile.id}</p>
          <p className="profile-modal-edit" onClick={onEditProfile}>{profileEdit ? 'Simpan perubahan' : 'Edit profile'}</p>
        </div>
      </Modal>
      <div className="header" >
        <div style={{ cursor: "pointer" }} onClick={aktivSuara}>
          {
            isPlayed ?
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
              </svg>
          }
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="tooltipleft">
                Profile {profile.username}
              </Tooltip>
            }
          >
            <img src={profile.avatar ? profile.avatar : imageCharacter(profile.username)} alt="Profile" className="profile" onClick={funcSetModalProfileActive} />
          </OverlayTrigger>
        </div>
      </div>
      <div className='App-content'>
        <h2>Quizaze</h2>
        <p>Selamat datang di permainan Swalansky. ini adalah Webside yang menyediakan quiz bagi pengguna <br /> Mulai bermain! </p><br />
        <Button title="Main sekarang" action={funcSetModalActive} />
      </div>
      <div className="footer">
        <p>Admin Login</p>
        <p onClick={wa}>Join School</p>
      </div>
    </div>
  )
}

export default Index;