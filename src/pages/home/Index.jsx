import Button from "../../components/button/Index"
import guest from "../../assets/character/G.png"
import { play } from "../../util/generateMusic"
import "./index.scss"

export default ({ funcSetModal }) => {
  const wa = () => {
    window.open("https://api.whatsapp.com/send?phone=089504731540&text=Hallo%20kak%20saya%20ingin%20bergabung%20di%20Quizaze.%20supaya%20pembelajaran%20di%20sekolah%20kami%20jadi%20lebih%20menyenagkan")
    play()
  }
  return (
    <div style={{ width: '100%', display: "flex", justifyContent: 'center', border: '1px solid red' }} id="music">
      <img src={guest} alt="Profile" className="profile" title="Profile" />
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

