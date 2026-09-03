import {useContext ,useEffect ,useState} from 'react';
import {DataContext} from '../App';
import QuestionsData from '../data/QuestionsData';

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const {score, setScore, setAppState} = useContext(DataContext);
    const [choices, setChoices] = useState(Array.from({ length: QuestionsData.length }, (_, i) => ""));
    
    useEffect(()=>{
        console.log(choices);
        console.log(score);
    },[choices])

    const selectChoice = (value) => {
        setChoices((data) =>
            data.map((c, i) => (i === current ? value : c))
        );
    };

    const checkAnswer = () => {
        let newScore = 0;
        for (let i = 0; i < QuestionsData.length; i++) {
            if(choices[i] !== "" && choices[i] === QuestionsData[i].answer){
                newScore++;
            }
        }
        setScore(newScore);
    }

    const nextQuestion = (di) => {
        if (di === "next") {
            if(current===QuestionsData.length-1){
                setAppState('score');
                let newScore = 0;
                for (let i = 0; i < QuestionsData.length; i++) {
                    if(choices[i] !== "" && choices[i] === QuestionsData[i].answer){
                        newScore++;
                    }
                }
                setScore(newScore);
            }
            else{
                setCurrent(current+1);
            }
        }
        else {
            if(current !== 0){
                setCurrent(current-1);
            }
        }
    }

    return(
        <div className="quiz">
            <h1>{QuestionsData[current].question}</h1>
            <div className = "choices">
                <button onClick={()=>selectChoice("A")} disabled={choices[current] === "A"}>{QuestionsData[current].A}</button>
                <button onClick={()=>selectChoice("B")} disabled={choices[current] === "B"}>{QuestionsData[current].B}</button>
                <button onClick={()=>selectChoice("C")} disabled={choices[current] === "C"}>{QuestionsData[current].C}</button>
                <button onClick={()=>selectChoice("D")} disabled={choices[current] === "D"}>{QuestionsData[current].D}</button>
            </div>
            <p>{`${current+1} / ${QuestionsData.length}`}</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" , width: "80%"}}>
                <button
                    onClick={()=>nextQuestion("prev")}
                    disabled={current === 0}
                >
                    ย้อนกลับ
                </button>
                <button 
                    onClick={()=>nextQuestion("next")}
                    disabled={choices[current] === ""}
                >
                    {current === QuestionsData.length-1 ? "ส่งข้อสอบ" : "ถัดไป"}
                </button>
            </div>
        </div>
    )
}

export default Quiz;