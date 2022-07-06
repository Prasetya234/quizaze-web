import './index.scss'

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { play } from '../../util/generateMusic'
import { getApi, getAdminMateri } from '../../app/fetchApi/connect'
import LoadingGalaxy from '../../components/load-galaxy/Index'
import notImage from '../../assets/icon/not-image.png'
import Swal from "sweetalert2"
import Modal from '../../components/modal/Modal'

export default function Index() {
    const { id } = useParams()
    const [schoolId, setSchoolId] = useState("")
    const [numbSelect, setNumbSelect] = useState(null)
    const [modalMateri, setModalMateri] = useState(false)
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
        if (!getQuestionName()) {
            await getApi(datauser.user.id)
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
    const openModalSetMateri = () => {
        play()
        setModalMateri(true)
        settingDataQuestion()
    }
    const updateListQuestion = (data, idx) => {
        const session = getQuestionName()
        session.question[numbSelect] = {
            answerTrue: idx !== null ? data[idx] : session.question[numbSelect].answerTrue,
            image: session.question[numbSelect].image,
            question: session.question[numbSelect].question,
            countUsed: session.question[numbSelect].countUsed,
            id: session.question[numbSelect].id,
            listAnswer: data
        }
        localStorage.setItem('question-edit', JSON.stringify(session))
        settingDataQuestion()
        if (idx !== null) {
            window.location.reload()
        }
    }
    const updateMateriName = (question) => {
        const session = getQuestionName()
        session.question[numbSelect] = {
            answerTrue: session.question[numbSelect].answerTrue,
            image: session.question[numbSelect].image,
            question: question,
            countUsed: session.question[numbSelect].countUsed,
            id: session.question[numbSelect].id,
            listAnswer: session.question[numbSelect].listAnswer
        }
        localStorage.setItem('question-edit', JSON.stringify(session))
        window.location.reload()
    }
    const onRemoveFunction = async (index) => {
        play()
        const session = getQuestionName()
        session.question.splice(index, 1)
        localStorage.setItem('question-edit', JSON.stringify(session))
        window.location.reload()
    }
    const addQuestionUser = () => {
        play()
        const session = getQuestionName()
        session.question.push({
            answerTrue: '',
            image: '',
            question: '',
            countUsed: 0,
            id: '',
            listAnswer: []
        })
        localStorage.setItem('question-edit', JSON.stringify(session))
        settingDataQuestion()
    }
    useEffect(() => {
        onGetDataQustion()
    }, [])
    return (
        <>
            {loading ? <LoadingGalaxy /> : (
                <div className="box">
                    <Modal title="Edit judul materi" close={() => { play(); setModalMateri(false) }} active={modalMateri} height="400px">
                        <ModalMateri materis={materi} action={() => { setModalMateri(false); settingDataQuestion() }} />
                    </Modal>
                    <div className="aksdjsdj">
                        <div style={{ display: 'flex', alignItems: 'center' }} onClick={backHome}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                            <p style={{ margin: '0 9px', cursor: 'pointer' }}>Kembali</p>
                        </div>
                        <p style={{ cursor: 'pointer' }} onClick={openModalSetMateri} title="Edit materi">{materi.materi}</p>
                        <div className="info-materi">
                            <div className="info-materi-content">
                                <p>Question total</p>
                                <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '10px' }}>{questions.length}</p>
                                <button title="tambah pertanyaan" onClick={addQuestionUser}>
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
                        <LeftContent datas={questions} select={selectNumberQuestion} numb={numbSelect} remove={onRemoveFunction} />
                        <RightContent datas={questionSelect} modify={updateListQuestion} updateQuestion={updateMateriName} />
                    </div>
                    <div className="footer-edit">
                        <p>{schoolId}</p>
                        <p>View question: {questionSelect ? questionSelect.countUsed : 0}</p>
                    </div>
                </div>)}
        </>
    )
}

function ModalMateri({ materis, action }) {
    const [materi, setMateri] = useState(materis.materi)
    const [teacher, setTeacher] = useState(materis.teacher)
    const [description, setDescription] = useState(materis.description)
    const onMateri = () => {
        play()
        const session = getQuestionName()
        const dataSession = {
            description: description,
            materi: materi,
            teacher: teacher,
            question: materis.question
        }
        localStorage.setItem('question-edit', JSON.stringify(dataSession))
        action()
    }
    const getQuestionName = () => {
        return JSON.parse(localStorage.getItem('question-edit'))
    }
    return (
        <>
            <div>
                <input type="text" placeholder="Nama Materi" autoFocus value={materi} onChange={(e) => setMateri(e.target.value)} />
                <input type="text" placeholder="Guru" autoFocus value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Taruh deskripsi di sini" id="floatingTextarea2" style={{ height: '100px' }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea2" style={{ fontSize: '16px' }}>Deskripsi</label>
                </div>
            </div>
            <div className="profile-modal-id">
                <p className="profile-modal-edit" onClick={onMateri} style={{ textAlign: 'center' }}>Simpan perubahan</p>
            </div>
        </>
    )
}

function LeftContent({ datas, select, numb, remove }) {
    return (
        <div className="update-left">
            <div className="question-list">
                {datas.map((e, i) => (<div className="question-list-page" key={i} title={e.question} onClick={() => select(i)} style={numb === i ? {
                    color: "black",
                    backgroundColor: "aquamarine"
                } : {}}>
                    <div className="position" title="Hapus pertanyaan" onClick={() => remove(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16" >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                        </svg>
                    </div>
                    <p>{e.question ? e.question : 'Belum ada pertanyaan'}</p>
                </div>))}
            </div>
        </div>
    )
}

function RightContent({ datas, modify, updateQuestion }) {
    const [modal, setModal] = useState(false)
    const [modalQuestion, setModalQuestion] = useState(false)
    const [select, setSelect] = useState("")
    const [question, setQuestion] = useState("")
    const [answerTrue, setAnswerTrue] = useState(null)
    const [numbSelect, setNumbSelect] = useState(null)
    const [add, setAdd] = useState(false)
    const onSelect = (index, active) => {
        setSelect(datas.listAnswer[index])
        setNumbSelect(index)
        setModal(true)
        if (active) setAnswerTrue(index)
    }
    const onSavePilihan = () => {
        if (add) {
            const array = datas.listAnswer
            array.push(select)
            modify(array, null)
        } else {
            const array = datas.listAnswer
            array[numbSelect] = select
            modify(array, answerTrue)
        }
        setModal(false)
        setAnswerTrue(null)
        setAdd(false)
    }
    const trueAnswerSelected = () => {
        if (add) {
            const array = datas.listAnswer
            array.push(select)
            modify(array, array.length - 1)
        } else {
            const array = datas.listAnswer
            array[numbSelect] = select
            modify(array, numbSelect)
        }
        setModal(false)
        setAnswerTrue(null)
        setAdd(false)
    }
    const onAddQuestion = () => {
        play()
        setSelect("")
        setModal(true)
        setAdd(true)
    }
    const openModalQuestion = () => {
        play()
        setQuestion(datas.question)
        setModalQuestion(true)
    }
    return (
        <div className="update-right" >
            <Modal title="Pilihan ganda" close={() => { play(); setModal(false) }} active={modal} height="200px">
                <input type="text" placeholder="Nama Materi" autoFocus value={select} onChange={(e) => setSelect(e.target.value)} />
                <div className="profile-modal-id">
                    <p className="profile-modal-edit" onClick={trueAnswerSelected}>Pilih sebagai jawaban benar</p>
                    <p className="profile-modal-edit" onClick={onSavePilihan}>Simpan perubahan</p>
                </div>
            </Modal>
            <Modal title="Tulis Pertanyaan" close={() => { play(); setModalQuestion(false) }} active={modalQuestion} height="200px">
                <input type="text" placeholder="Nama Materi" autoFocus value={question} onChange={(e) => setQuestion(e.target.value)} />
                <div className="profile-modal-id">
                    <p className="profile-modal-edit" onClick={() => { play(); updateQuestion(question); setModalQuestion(false) }}>Simpan perubahan</p>
                </div>
            </Modal>
            {datas ?
                (<div className="quest">
                    <img src={datas.image ? datas.image : notImage} alt="Iamge Question" className="quest-image" draggable="false" />
                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>{datas.question ? datas.question : 'Belum ada soal'}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16" style={{ marginLeft: '10px', marginTop: '-8px', cursor: 'pointer' }} onClick={openModalQuestion}>
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg></p>
                    <div className="answer-content">
                        {datas.listAnswer.map((e, i) => (
                            <button style={datas.answerTrue === e ? { backgroundColor: 'blue' } : {}} key={i} title={e} onClick={() => onSelect(i, datas.answerTrue === e)}>{e}</button>
                        ))}
                        {datas.listAnswer.length !== 4 && <button title="tambah pilihan" onClick={onAddQuestion}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg></button>}
                    </div>
                </div>) : (<div className="bubble-content">
                    <div className="bubble-content-answer">
                        <p>No question here yet...</p>
                        <img src="http://i.stack.imgur.com/SBv4T.gif" alt="Gif empty question" width="250" draggable="false" />
                    </div>
                </div>)}
        </div>
    )
}
