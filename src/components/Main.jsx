import { useState } from "react";
import Die from "./Main_Files/Die";
import { nanoid } from "nanoid";

export default function Main(){
    const [ dies , setDies ] = useState(allNewDies());

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

    // setting new randome number when roll button clicked except previously clicked dice
    function rollDies() {
        setDies(prvDie => prvDie.map(die => {
            return die.isHeld ?
                die :
                generateDie()
        }))
    }

    function holdDies(id) {
        console.log(id)
        setDies(oldDie => oldDie.map(die => {
            return die.key === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    console.log(dies)
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
        <main>
            <div className="mainContainer">
                <div className="box-heading">
                    <h1>Tenzies</h1>
                    <h5>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
                </div>
                <div className="box-container">
                    {/* {dies.map(die => <Die key={die.key} value={die.value} isHeld={die.isHeld} id={die.key} holdDies={()=>holdDies(die.key)} />)} */}
                    {diesElements}
                </div>
                <button className="roll-dies" onClick={rollDies}>Roll</button>
            </div>
        </main>
    )
}