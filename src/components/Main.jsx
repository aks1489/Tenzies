import { useEffect, useState, useRef } from "react";
import Die from "./Main_Files/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Modal from "./Main_Files/Modal";
import Timer from "./Main_Files/Timer";

export default function Main(){
    const [ dies , setDies ] = useState(allNewDies());
    const [ game, setGame ] = useState(false);
    const [ modal, setModal ] = useState(false)

    // Roll Counter
    const [ rollCount, setRollCount ] = useState(0);

    // Timer
    const [ timer, setTimer ] = useState(false)
    const [ currentTime, setCurrentTime ] = useState(0)

    // generating isheld? and key (nanoid) property
    function generateDie() {
        return {
            value: Math.floor((Math.random() * 6 ) + 1), 
            isHeld: false, 
            key: nanoid()
        }
    }
    
    // generating 10 random numbers with 'generateDie()' function
    function allNewDies() {
        let num = []
        for(let i = 0; i< 10 ; i++) {
            num[i] = generateDie();
            // num.push(Math.ceil(Math.random() * 6 ));
        }
        return num
    }

    // setting new randome number when roll button clicked except previously clicked
    function rollDies() {
        // reset game when game if game is true
        if(!game){
            setDies(prvDie => prvDie.map(die => {
                return die.isHeld ?
                    die :
                    generateDie()
            }))
            setRollCount(prvCount => prvCount + 1)
        }else{
            resetGame()
        }
    }

    // holding the dice values 
    function holdDies(id) {
        setDies(oldDie => oldDie.map(die => {
            return die.key === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    // reset the Game & set timer , roll count to 0 and start new timer
    function resetGame() {
        setDies(allNewDies)
        setGame(false)
        setRollCount(0)
        setCurrentTime(0)
        setTimer(true)
    }

    useEffect(() => {
        //  {{  -------------------> check every dice {if all the value of "isHeld" is 'true'} and 
        //  {"value" property values are similer to zero(0) index are similer
        //  if all condition are tru then set the 'game' to true -----------< }}
        //
        //      ------>Code<------- (incomplete)
        // for( let i = 0; i < 10; i++ ) {
        //     if(dies[i].isHeld && dies[0].value === dies[i].value){
        //         setGame(true)
        //     }else{
        //         setGame(false)
        //         break;
        //     }
        // }

        const allHeld = dies.every(die => die.isHeld)
        const allSameValue = dies.every(die => die.value === dies[0].value)

        if (allHeld && !allSameValue){
            // if all number are not matched setting modal status to true
            setModal(true)
        } else if (allHeld && allSameValue) {
            setGame(true)
            setTimer(false)
        }

    }, [dies])


    // Timer Function
    useEffect(()=>{
        let intervalId;
        if(timer) {
            intervalId = setInterval(()=>{
                setCurrentTime(prvTime => prvTime + 1 )
            }, 1000)
        } else {
            clearInterval(intervalId)
        }

        return () =>{
            clearInterval(intervalId)
        }
    },[timer])

    useEffect(() =>{
        setTimer(true)
    },[])

    // mapping over dies for getting 10 dies with prop
    const diesElements = dies.map(die => (
        <Die 
            key={die.key} 
            value={die.value} 
            isHeld={die.isHeld} 
            id={die.key} 
            holdDies={()=>holdDies(die.key)} 
        />)
    )
    
    return(
        <>
            <Modal modal={modal} setModal={setModal} />
            <main style={{ filter: modal ? "blur(5px)" : "none" , pointerEvents: modal ? "none" : "all"}}>
                {game && <ReactConfetti />}
                <div className="mainContainer">
                    <div className="box-heading">
                        <h1>Tenzies</h1>
                        <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                        <div className="gameStats">
                            <div className="best-time-box">
                                <h2 className="stats">Best Time - 01:00</h2>
                            </div>
                            <div className="current-time">
                            <Timer
                                time={currentTime}
                            />
                            </div>
                            <div className="total-roll">
                                <h2 className="stats">Rolls - {rollCount}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="box-container">
                        {/* {dies.map(die => <Die key={die.key} value={die.value} isHeld={die.isHeld} id={die.key} holdDies={()=>holdDies(die.key)} />)} */}
                        {diesElements}
                    </div>
                    <button className="roll-dies" onClick={rollDies}>{game ? "New Game" : "Roll"}</button>
                </div>
            </main>
        </>
    )
}