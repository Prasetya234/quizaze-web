import "./index.scss"
import animals from "../../data/animals"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Index = () => {
    let { id } = useParams()
    const [question, setQuestion] = useState({})
    const [answer, setAnswer] = useState([])
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            animals()
        }
        return () => { ignore = true; }
    }, []);
    return (
        <div className="box">
            <div style={{ width: "70%" }}>
                <img src={question.img} alt="Animals" style={{ width: "100%", height: "400px" }} />
            </div>
            <div className="box-question">
                <p>Apa nama hewan di atas?</p>
            </div>
            <div className="box-content">
                {answer.map((e, index) => (
                    <div className="box-content-answer" key={index} >
                        <p >{e.name}</p>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Index