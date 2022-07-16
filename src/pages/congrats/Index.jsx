import React, { useEffect, useState } from 'react';
import './index.scss'
import LoadingGalaxy from '../../components/load-galaxy/Index';
import img3 from '../../assets/images/cetak3.png'
import img1 from '../../assets/images/cetak.png'
import img2 from '../../assets/images/cetak2.png'
import Button from '../../components/button/Index';
import { getUserScore } from '../../app/fetchApi/connect'
import { useNavigate, useParams } from 'react-router-dom';
import { play } from '../../util/generateMusic';

function Index() {
    const { id } = useParams()
    const navigator = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [scoreUser, setScoreUser] = useState({ materi: { materi: '' }, score: 0, totalQuestionAnswer: 0, user: { username: '' } });
    const stopBrowserBack = () => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
        };
    };
    const fetchUserScore = async () => {
        setIsLoading(true)
        const res = await getUserScore(id)
        setIsLoading(false)
        if (!res) {
            navigator('/not-found')
            return
        }
        setScoreUser(res)
    }
    const takePrintResult = () => {
        window.print()
    }
    useEffect(() => {
        stopBrowserBack()
        fetchUserScore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>

            {!isLoading ? (
                <div className="head-content">
                    <div className="print" onClick={takePrintResult} id="content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                        </svg>
                        <p>Print</p>
                    </div>
                    <div className="box-sizing">
                        <img src={img2} alt="logo" className="image3" draggable="false" />
                        <img src={img1} alt="logo" className="image" draggable="false" />
                        <img src={img3} alt="logo" className="image2" draggable="false" />
                    </div>
                    <div className="message-answer">
                        <p>Selamat, <b>{scoreUser.user.username}</b>. Kamu telah menyelesaikan soal {scoreUser.materi.materi} dengan kamu menjawab soal sebanyak {scoreUser.totalQuestionAnswer}. Nilai kamu adalah <b style={{ color: scoreUser.score >= 60 ? 'blue' : 'red' }}>{scoreUser.score}</b>. <br /> <span id="content">Terima kasih telah menyelesaikan soal ini</span></p>
                        <div className="button" id="content">
                            <Button title="Kembali ke beranda" action={() => { play(); navigator('/') }} />
                        </div>
                    </div>
                </div>) : (
                <LoadingGalaxy />
            )}
        </>
    )
}

export default Index;