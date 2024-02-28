import { useEffect, useState } from "react";
import Die from "./Main_Files/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Wrong from "../assets/wrong.gif"

export default function Main(){
    const [ dies , setDies ] = useState(allNewDies());
    const [ game, setGame ] = useState(false);
    const [ modal, setModal ] = useState(false)
    const [ modalDisplay, setModalDispay ] = useState("none")


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

    // reset the Game
    function resetGame() {
        setDies(allNewDies)
        setGame(false)
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
        }

    }, [dies])

    function closeModal() {
        setModal(false)
    }

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

    // setting modal display property
    useEffect(() => {
        setModalDispay(() => modal ? "flex" : "none")
        console.log(modalDisplay)
        console.log("triggerd")
    }, [modal])

    return(
        <>
            <div className="modal" style={{display : modalDisplay}}>
                <h2 className="modal-top-text">All number are not matched</h2>
                <img className="modal-img" src={Wrong} alt="Number not Matched" />
                <h2 className="modal-bottom-text"> Try to match all the numbers correctly</h2>
                <button className="modal-close" onClick={closeModal}>Close</button>
            </div>
            <main style={{ filter: modal ? "blur(5px)" : "none" }}>
                {game && <ReactConfetti />}
                <div className="mainContainer">
                    <div className="box-heading">
                        <h1>Tenzies</h1>
                        <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
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