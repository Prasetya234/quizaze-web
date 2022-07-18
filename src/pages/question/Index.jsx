/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope */
import './index.scss';
import notImage from '../../assets/icon/not-image.png'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import LoadingGalaxy from '../../components/load-galaxy/Index';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../app/feature/connectSlice';
import { questionMateriUser, getApi, answerQuestionUser, getSchoolById, updateUserSchool } from '../../app/fetchApi/connect';
import { useNavigate, useParams } from 'react-router-dom';
import { play, endAnswer, playAnswerTrue, playAnswerFalse } from '../../util/generateMusic';
import { Helmet } from 'react-helmet';

function Index() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [activeSelect, setActiveSelect] = useState(null);
    const [lastNumbQuest, setLastNumbQuest] = useState(0);
    const [question, setQuestion] = useState({
        image: "",
        question: "",
        listAnswer: []
    });
    const [materi, setMateri] = useState({
        materi: "",
        description: "",
        questionTotal: 0,
        question: []
    });
    const [school, setSchool] = useState({
        headMaster: "",
        id: "",
        name: "",
        phoneNumber: "",
        address: "",
    })
    const [loadQuestion, setLoadQuestion] = useState(false);
    const fetchUserAuth = async () => {
        const datauser = JSON.parse(localStorage.getItem('auth'));
        const res = await getApi(datauser ? datauser.user.id : '');
        if (!res) return;
        dispatch(setProfile(res.user));
    };
    const selectAnswer = (idx) => {
        play()
        setActiveSelect(idx)
    };
    const fetchCheckingUserSchool = async (id) => {
        const school = JSON.parse(localStorage.getItem('auth'));
        const dat = school.user.school
        if (dat && dat.id === id) {
            return
        }
        setLoadQuestion(true);
        const data = await getSchoolById(id);
        if (!data) {
            setLoadQuestion(false);
            navigate('/not-found')
            return
        }
        setSchool(data)
        const res = await Swal.fire({
            title: `Soal ini berbeda dengan sekolah yang kamu pakai`,
            text: `Ganti ke sekolah ${school.name} dan mulai mengerjakan soal`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Tidak, tetap pakai sekolah lama',
            confirmButtonText: 'Iya, Ganti ke sekolah ini'
        })
        if (!res.isConfirmed) {
            navigate('/not-found')
            return
        }
        await updateUserSchool(id)
        window.location.reload();
    }
    const fetchQuestionUser = async () => {
        setLoadQuestion(true);
        await fetchUserAuth();
        const res = await questionMateriUser(id);
        setLoadQuestion(false);
        const query = window.location.search;
        const param = new URLSearchParams(query).get("school");
        if (!res && param) {
            await fetchCheckingUserSchool(param);
            return
        };
        if (!res) {
            navigate("/not-found")
            return
        }
        localStorage.setItem('question-now', JSON.stringify(res))
        localStorage.setItem('num', 0)
        onGetQuestion()
    };
    const onGetQuestion = () => {
        const listQestion = funcGetQuestionNow();
        const number = Number(localStorage.getItem('num'));

        lastNumberQusetion()
        setMateri(listQestion)
        setQuestion(listQestion.question[number])
    }
    const backhome = async () => {
        play()
        const number = Number(localStorage.getItem('num'));
        const res = await Swal.fire({
            title: 'Yakin mau kembali ?',
            text: `${!number ? '' : 'Kamu tidak bisa menjawab soal ini lagi dan nilai kamu akan terkirim'}  `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Keluar',
            confirmButtonText: 'Ga jadi'
        })
        if (!res.isConfirmed) {
            removeSession()
            navigate('/');
        }
    }
    const removeSession = () => {
        localStorage.removeItem('num')
        localStorage.removeItem('question-now')
    }
    const onAnswerButton = async () => {
        play()
        if (activeSelect === null) {
            Swal.fire({
                text: "Pastikan kamu memilih jawaban nya dulu ya",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Iya'
            })
            return;
        }
        const listQestion = funcGetQuestionNow()
        const rer = Number(localStorage.getItem('num'));
        setLoadQuestion(true)
        const res = await answerQuestionUser({ materiId: listQestion.question[rer].id, data: { answer: listQestion.question[rer].listAnswer[activeSelect] } });
        setLoadQuestion(false)
        if (!res) {
            await Swal.fire({
                icon: 'error',
                text: `Sepertinya kamu telah mengerjaan quiz ini. kembali ke beranda`,
                confirmButtonText: 'Iya'
            })
            removeSession()
            navigate('/');
            return
        }
        await trueOrFalseAnswer(res);
        localStorage.setItem('num', rer + 1);
        if (Number(localStorage.getItem('num')) === listQestion.questionTotal) {
            setLoadQuestion(true)
            removeSession()
            endAnswer()
            setTimeout(() => {
                navigate("/user-score/" + listQestion.id)
            }, 2500)
            return
        }
        setActiveSelect(null)
        onGetQuestion()
    }
    const trueOrFalseAnswer = async (data) => {
        if (data.correct) {
            playAnswerTrue()
            await Swal.fire({
                text: "Hore... Jawaban kamu benar",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Iya'
            })
        } else {
            playAnswerFalse()
            await Swal.fire({
                icon: 'error',
                text: `Oh tidak... jawaban yang benar adalah ${data.question.answerTrue}`,
            })
        }
    }
    const funcGetQuestionNow = () => {
        return JSON.parse(localStorage.getItem('question-now'))
    }
    const lastNumberQusetion = () => {
        const numb = funcGetQuestionNow()
        const number = Number(localStorage.getItem('num'));
        setLastNumbQuest(numb.questionTotal - (number + 1))
    }
    useEffect(() => {
        if (!funcGetQuestionNow()) {
            fetchQuestionUser();
        } else {
            onGetQuestion()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="leads">

            {
                !loadQuestion ? (
                    <div className="box">
                        <Helmet>
                            <title>{materi.materi}</title>
                            <meta name="description" content={materi.description} />
                        </Helmet>
                        <div className="aksdjsdj">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                                <p style={{ margin: '0 9px', cursor: 'pointer' }} onClick={backhome}>Kembali ke beranda</p>
                            </div>
                            <p>{materi.materi}</p>
                            <p className="select-answer" onClick={onAnswerButton}>Menjawab</p>
                        </div>
                        <div className="image-answer">
                            <img src={question.image ? question.image : notImage} alt="img question" style={{ width: '100%', height: '320px' }} draggable="false" />
                            <div className="box-question">
                                <p style={{ textAlign: 'left' }}>{question.question}</p>
                            </div>
                            <div className="box-content">
                                {question.listAnswer.map((e, i) => (
                                    <div className="box-content-answer" key={i} onClick={() => selectAnswer(i)}>
                                        <span style={{ backgroundColor: activeSelect === i ? 'blue' : '' }} title={e}>{e}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="sisa-soal" > {lastNumbQuest ? `Sisa soal ${lastNumbQuest}` : 'Soal Terakhir'}</p>
                    </div>
                ) : (
                    <LoadingGalaxy />
                )
            }
        </div>
    );
}


export default Index;
