import React, { useState } from "react"
import StartScreen from "./Componants/StartScreen"
import QuizScreen from "./Componants//QuizScreen"
import Loader from "./Componants//Loader"
import './app.css'

export default function App() {
    const [startGame, setStartGame] = useState(false)
    const [quizData, setQuizData] = useState([])

    function getQuizData() {
        setQuizData([])
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            .then(res => res.json())
            .then(data => {
                
                data.results.map( obj => {
                    const allAns = obj.incorrect_answers
                    const num = Math.floor(Math.random() * 4)
                    allAns.splice(num, 0, obj.correct_answer)
                    obj.all_answers = allAns
                    return obj
                })
                setQuizData(data.results)
            })
    }
    
    
    function handleStart() {
        setStartGame(true)
        getQuizData()
    }

    
    return (
        <div className="body-content">
            {!startGame 
                ? <StartScreen handleStart={handleStart} /> 
                : quizData.length === 0 
                ? <Loader />
                : <QuizScreen getQuizData={getQuizData} quizData={quizData} />
            }
        </div>
    )
}