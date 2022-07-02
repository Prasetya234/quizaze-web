/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope */
import './index.scss';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../app/feature/connectSlice';
import { questionMateriUser, getApi } from '../../app/fetchApi/connect';
import { useNavigate, useParams } from 'react-router-dom';

function Index() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const [question, setQuestion] = useState({
        questionTotal: 0,
        materi: '',
        question: [],
    });
    const [answer, setAnswer] = useState(
        [
            {
                name: 'answer',
                awok: false
            },
            {
                name: 'answer',
                awok: false
            },
            {
                name: 'answer',
                awok: false
            },
            {
                name: 'answer',
                awok: false
            },
        ]
    );
    const [loadQuestion, setLoadQuestion] = useState(false);
    const fetchUserAuth = async () => {
        const datauser = JSON.parse(localStorage.getItem('auth'));
        const res = await getApi(datauser ? datauser.user.id : '');
        if (!res) return;
        dispatch(setProfile(res.user));
    };
    const selectAnswer = () => {
        setAnswer(prevState => {
            const newState = prevState.map(obj => {
                return { ...obj, awok: false };
            });
            return newState;
        });
    };
    const fetchQuestionUser = async () => {
        setLoadQuestion(true);
        await fetchUserAuth();
        const res = await questionMateriUser(id);
        setLoadQuestion(false);
        if (!res) return;
        setQuestion(res);
    };
    const backhome = async () => {
        const res = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (res.isConfirmed) {
            navigate('/');
        }
    }
    useEffect(() => {
        fetchQuestionUser();
    }, []);
    return (
        <div className="leads">
            {
                !loadQuestion ? (
                    <div className="box">
                        <div className="aksdjsdj">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                                <p style={{ margin: '0 9px', cursor: 'pointer' }} onClick={backhome}>Kembali ke beranda</p>
                            </div>
                            <p>{question.materi}</p>
                            <p>Menjawab</p>
                        </div>
                        <div className="image-answer">
                            <img src="https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2lsZCUyMGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="Animals" style={{ width: '100%', height: '320px' }} />
                            <div className="box-question">
                                <p onClick={selectAnswer}>Apa nama hewan di atas?</p>
                            </div>
                            <div className="box-content">
                                {answer.map((e, i) => (
                                    <div className="box-content-answer" key={i} onClick={() => selectAnswer(i)}>
                                        <p style={{ backgroundColor: e.awok ? 'blue' : '' }}>{e.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingComponent />
                )
            }
        </div>
    );
}

function LoadingComponent() {
    return (
        <div>
            <div className="content">
                <div className="planet">
                    <div className="ring" />
                    <div className="cover-ring" />
                    <div className="spots">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <p>loading</p>
            </div>
        </div>
    );
}

export default Index;
