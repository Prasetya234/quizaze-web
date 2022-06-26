import React, { useEffect, useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import Button from "../../components/button/Index"
import { imageCharacter } from "../../util/generateImage"
import Music from "../../components/music-player/Index"
import { play } from "../../util/generateMusic"
import { useSelector, useDispatch } from "react-redux"
import { playm } from "../../app/feature/soundSlice"

import "./index.scss"

const Index = ({ funcSetModal }) => {
  const dispatch = useDispatch()
  const { isPlayed } = useSelector((state) => state.sound)
  const { profile } = useSelector(state => state.connect)


  const wa = () => {
    play()
    window.open("https://api.whatsapp.com/send?phone=089504731540&text=Hallo%20kak%20saya%20ingin%20bergabung%20di%20Quizaze.%20supaya%20pembelajaran%20di%20sekolah%20kami%20jadi%20lebih%20menyenagkan")
  }
  const aktivSuara = () => {
    play()
    dispatch(playm({ play: !isPlayed }))
  }
  return (
    <div style={{ width: '100%', display: "flex", justifyContent: 'center' }} id="music">
      <Music played={isPlayed} />

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
            <img src={imageCharacter(profile.username)} alt="Profile" className="profile" />
          </OverlayTrigger>
        </div>
      </div>
      <div className='App-content'>
        <h2>Quizaze</h2>
        <p>Selamat datang di permainan Swalansky. ini adalah Webside yang menyediakan quiz bagi pengguna <br /> Mulai bermain! </p><br />
        <Button title="Main sekarang" action={funcSetModal} />
      </div>
      <div className="footer">
        <p>Admin Login</p>
        <p onClick={wa}>Join School</p>
      </div>
    </div>
  )
}

export default Index;