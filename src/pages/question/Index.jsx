/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope */
import './index.scss';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import animals from '../../data/animals';

function Index() {
    //   const { id } = useParams();
    const [question] = useState({});
    const [answer] = useState([]);
    const [loadQuestion, setLoadQuestion] = useState(false);
    useEffect(() => {
        setLoadQuestion(true);
        animals();
        setTimeout(() => {
            setLoadQuestion(false);
        }, 3000);
    }, []);
    return (
        <div className="leads">
            {
                !loadQuestion ? (
                    <div className="box">
                        <div style={{ width: '70%' }}>
                            <img src={question.img} alt="Animals" style={{ width: '100%', height: '400px' }} />
                        </div>
                        <div className="box-question">
                            <p>Apa nama hewan di atas?</p>
                        </div>
                        <div className="box-content">
                            {answer.map((e, index) => (
                                <div className="box-content-answer" key={index}>
                                    <p>{e.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
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
                )
            }
        </div>
    );
}

export default Index;
