import './index.scss'

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { play } from '../../util/generateMusic';
import { getApi, getAdminMateri } from '../../app/fetchApi/connect';
import LoadingGalaxy from '../../components/load-galaxy/Index';
import notImage from '../../assets/icon/not-image.png'
import Swal from "sweetalert2"

export default function Index() {
    const { id } = useParams()
    const [schoolId, setSchoolId] = useState("")
    const [numbSelect, setNumbSelect] = useState(null);
    const [questionSelect, setQuestionSelect] = useState(null)
    const [questions, setQuestions] = useState([]);
    const [materi, setMateri] = useState({
        questionTotal: 0,
        teacher: "",
        materi: "",
    });
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const backHome = async () => {
        play()
        const res = await Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Keluar',
            text: 'Data kamu belum tersimpan, yakin mau keluar?',
            icon: 'question'
        })
        if (!res.isConfirmed) {
            return
        }
        localStorage.removeItem('question-edit')
        navigator("/admin")
    }
    const onGetDataQustion = async () => {
        setLoading(true)
        const datauser = getSessionuser();
        setSchoolId(datauser.user.school.id)
        await getApi(datauser ? datauser.user.id : '');
        if (!getQuestionName()) {
            const res = await getAdminMateri(id);
            localStorage.setItem('question-edit', JSON.stringify(res))
        }
        settingDataQuestion()
        setLoading(false)
    }
    const settingDataQuestion = () => {
        const res = getQuestionName()
        setMateri(res)
        setQuestions(res.question)
    }
    const getSessionuser = () => {
        return JSON.parse(localStorage.getItem('auth'))
    }
    const getQuestionName = () => {
        return JSON.parse(localStorage.getItem('question-edit'))
    }
    const selectNumberQuestion = (index) => {
        play()
        setNumbSelect(index)
        setQuestionSelect(questions[index])
    }
    useEffect(() => {
        onGetDataQustion()
    }, [])
    return (
        <>
            {loading ? <LoadingGalaxy /> : (<div className="box">
                <div className="aksdjsdj">
                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={backHome}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        <p style={{ margin: '0 9px', cursor: 'pointer' }}>Kembali</p>
                    </div>
                    <p>{materi.materi}</p>
                    <div className="info-materi">
                        <div className="info-materi-content">
                            <p>Question total</p>
                            <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '10px' }}>{materi.questionTotal}</p>
                            <button title="tambah pertanyaan">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </button>
                            <button>
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
                <div className="update">
                    <LeftContent datas={questions} select={selectNumberQuestion} numb={numbSelect} />
                    <RightContent datas={questionSelect} />
                </div>
                <div className="footer-edit">
                    <p>{schoolId}</p>
                    <p>View question: {questionSelect ? questionSelect.countUsed : 0}</p>
                </div>
            </div>)}
        </>
    )
}

function LeftContent({ datas, select, numb }) {
    const [loop] = useState([1, 2, 3, 4, 5, 6])
    return (
        <div className="update-left">
            <div className="question-list">
                {datas.map((e, i) => (<div className="question-list-page" key={i} title={e.question} onClick={() => select(i)} style={numb === i ? {
                    color: "black",
                    backgroundColor: "aquamarine"
                } : {}}>
                    <div className="position" title="Hapus pertanyaan">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16" >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                        </svg>
                    </div>

                    <p>{e.question}</p>
                </div>))}
            </div>
        </div>
    )
}

function RightContent({ datas }) {

    return (
        <div className="update-right" >
            {datas ?
                (<div className="quest">
                    <img src={datas.image ? datas.image : notImage} alt="image" className="quest-image" draggable="false" />
                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>{datas.question}</p>
                    <div className="answer-content">
                        {datas.listAnswer.map((e, i) => (
                            <button style={datas.answerTrue === e ? { backgroundColor: 'blue' } : {}} key={i}>{e}</button>
                        ))}
                    </div>
                </div>) : (<div className="bubble-content">
                    <div className="bubble-content-answer">
                        <p>No question here yet...</p>
                        <img src="http://i.stack.imgur.com/SBv4T.gif" alt="this slowpoke moves" width="250" />
                    </div>
                </div>)}
        </div>
    )
}
