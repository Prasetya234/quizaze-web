import React from 'react'
import backgound from './assets/bg.jpg'

export default function Mobile() {
    return (
        <>
            <header>
                <div className="container">
                    <nav className="navbar navbar-dark bg-transparenet">
                        <span className="navbar-text ml-auto d-none d-sm-inline-block">Jl. Bulustalan I No.27, 50245</span>
                        <span className="navbar-text d-none d-sm-inline-block">excellentcom.id</span>
                    </nav>
                </div>
            </header>
            <main className="my-auto">
                <div className="container">
                    <h1 style={{ color: 'white' }} className="page-title">We're coming soon</h1>
                    <p style={{ color: 'white' }} className="page-description">Maaf atas ketidak nyamanan nya. website Quizaze belum mendukung untuk di gunakan di mobile phone.<br />Kami akan berusaha merilis Quizaze agar bisa di gunakan di mobile phone</p>
                    <p style={{ color: 'white' }}>Stay connected</p>
                    <nav className="footer-social-links">
                        <a href="https://www.facebook.com/" className="social-link"><i className="mdi mdi-facebook-box"></i></a>
                        <a href="https://twitter.com/" className="social-link"><i className="mdi mdi-twitter"></i></a>
                        <a href="https://www.google.com/" className="social-link"><i className="mdi mdi-google"></i></a>
                        <a href="https://slack.com" className="social-link"><i className="mdi mdi-slack"></i></a>
                        <a href="https://web.skype.com/" className="social-link"><i className="mdi mdi-skype"></i></a>
                    </nav>
                </div>
            </main>
        </>
    )
}
